'use client';

import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import { Mesh } from 'three';
import GradientButtonObj from './gradient-button';
import ServiceModal from '../intro/ServiceModal';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
const GradientButton = GradientButtonObj.GradientButton;

import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
  mix,
  add
} from 'three/tsl';
import { ZIndex, zIndexFactorOffset } from '@tsparticles/engine';

const TEXTUREMAP = { src: 'https://i.postimg.cc/XYwvXN8D/img-4.png' };
const DEPTHMAP = { src: 'https://i.postimg.cc/2SHKQh2q/raw-4.webp' };

extend(THREE as any);

// Post Processing component
const PostProcessing = ({
  strength = 1,
  threshold = 1,
  fullScreenEffect = true,
}: {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}) => {
  const { gl, scene, camera } = useThree();
  const progressRef = useRef({ value: 0 });

  const render = useMemo(() => {
    const postProcessing = new THREE.PostProcessing(gl as any);
    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode('output');
    const bloomPass = bloom(scenePassColor, strength, 0.5, threshold);

    // Create the scanning effect uniform
    const uScanProgress = uniform(0);
    progressRef.current = uScanProgress;

    // Remove the red overlay scan effect
    // const redOverlay = vec3(1, 0, 0).mul(oneMinus(scanLine)).mul(0.4);

    // Mix the original scene without the red overlay
    const withScanEffect = scenePassColor;

    // Add bloom effect after scan effect
    const final = withScanEffect.add(bloomPass);

    postProcessing.outputNode = final;

    return postProcessing;
  }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

  useFrame(({ clock }) => {
    // Animate the scan line from top to bottom
    progressRef.current.value = (Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5);
    render.renderAsync();
  }, 1);

  return null;
};

const WIDTH = 300;
const HEIGHT = 300;

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);

  const meshRef = useRef<Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Показываем изображение после загрузки текстур
    if (rawMap && depthMap) {
      setVisible(true);
    }
  }, [rawMap, depthMap]);

  const { material, uniforms } = useMemo(() => {
    const uPointer = uniform(new THREE.Vector2(0));
    const uProgress = uniform(0);

    const strength = 0.01;

    const tDepthMap = texture(depthMap);

    const tMap = texture(
      rawMap,
      uv().add(tDepthMap.r.mul(uPointer).mul(strength))
    );

    const aspect = float(WIDTH).div(HEIGHT);
    const tUv = vec2(uv().x.mul(aspect), uv().y);

    const tiling = vec2(120.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);

    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));

    const dist = float(tiledUv.length());
    const dot = float(smoothstep(0.5, 0.49, dist)).mul(brightness);

    const depth = tDepthMap;

    const flow = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));

    const mask = dot.mul(flow).mul(vec3(10, 0, 0));

    const final = blendScreen(tMap, mask);

    const material = new THREE.MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0,
    });

    return {
      material,
      uniforms: {
        uPointer,
        uProgress,
      },
    };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock }) => {
    uniforms.uProgress.value = (Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5);
    // Плавное появление
    if (meshRef.current && 'material' in meshRef.current && meshRef.current.material) {
      const mat = meshRef.current.material as any;
      if ('opacity' in mat) {
        mat.opacity = THREE.MathUtils.lerp(
          mat.opacity,
          visible ? 1 : 0,
          0.07
        );
      }
    }
  });

  useFrame(({ pointer }) => {
    uniforms.uPointer.value = pointer;
  });

  const scaleFactor = 0.40;
  return (
    <mesh ref={meshRef} scale={[w * scaleFactor, h * scaleFactor, 1]} material={material}>
      <planeGeometry />
    </mesh>
  );
};


export const Html: React.FC = ()=> {
  const titleWords = 'Pay Your WorkForce'.split(' ');
  const subtitle = 'Global payroll and compliance made easy';
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);
  const [subtitleDelay, setSubtitleDelay] = useState(0);
  const router = useRouter();
  const service = {
        path: "/pages/auth?mode=payroll"
    };

  useEffect(() => {
    // Only on client: generate random delays for glitch effect
    setDelays(titleWords.map(() => Math.random() * 0.07));
    setSubtitleDelay(Math.random() * 0.1);
  }, [titleWords.length]);

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 600);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 800);
      return () => clearTimeout(timeout);
    }
  }, [visibleWords, titleWords.length]);

  return (
    
    <div className='h-svh relative'>
        
      {/* Top horizontal white line crossing both verticals, extends beyond them */}
      <div className="absolute" style={{ top: '60px', left: '0', right: '0', height: '1px', background: 'white', opacity: 0.8, zIndex: 100 }} />
      {/* Left vertical white line, starts at top-10px and ends at bottom-10px */}
      <div className="absolute" style={{ top: '0px', bottom: '10px', left: '60px', width: '1px', background: 'white', opacity: 0.8, zIndex: 100 }} />
      {/* Right vertical white line, starts at top-10px and ends at bottom-10px */}
      <div className="absolute" style={{ top: '0px', bottom: '10px', right: '60px', width: '1px', background: 'white', opacity: 0.8, zIndex: 100 }} />
       <div className="absolute top-1 ml-2 left-8/9 -translate-x-1/2 z-[80] ">
          <GradientButton variant={
"variant"          } onClick={() => {
                                    router.push(service.path);
                                }}>Get Started</GradientButton>
        </div>
            <div className="absolute" style={{ top: '0px', bottom: 'calc(100% - 60px)', right: '250px', width: '1px', background: 'white', opacity: 0.8, zIndex: 100 }} />
<div className="absolute top-1 ml-1  left-[76%] -translate-x-1/2 z-[80]">
          <GradientButton variant={
"variant"          } onClick={() => {
                                    router.push("/pages/about");
                                }}>About</GradientButton>
        </div>
            <div className="absolute" style={{ top: '0px', bottom: 'calc(100% - 60px)', right: '440px', width: '1px', background: 'white', opacity: 0.8, zIndex: 100 }} />

      {/* Main content area */}
      <div className="h-svh w-full flex flex-col items-center justify-center bg-black">
        {/* Grid overlay / Text Container */}
        {/* Needs to be absolute and have a high z-index to sit on top of the canvas. */}
        <div className="h-svh uppercase items-center w-full absolute z-[90] px-10 flex justify-center flex-col pointer-events-none">
          <div className="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold">
            <div className="flex  space-x-2 lg:space-x-6 overflow-hidden text-white" >
              {titleWords.map((word, index) => (
                <div
                  key={index}
                  className={index < visibleWords ? 'fade-in' : ''}
                  style={{ animationDelay: `${index * 0.13 + (delays[index] || 0)}s`, opacity: index < visibleWords ? undefined : 0 }}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs md:text-xl xl:text-2xl 2xl:text-3xl mt-2 overflow-hidden text-white font-bold">
            <div
              className={subtitleVisible ? 'fade-in-subtitle' : ''}
              style={{ animationDelay: `${titleWords.length * 0.13 + 0.2 + subtitleDelay}s`, opacity: subtitleVisible ? undefined : 0 }}
            >
              {subtitle}
            </div>
          </div>
        </div>

        {/* Three.js Canvas */}
        {/* The canvas itself should be absolute and occupy the full space, with a lower z-index. */}
        <Canvas
          flat
          gl={async (props) => {
            const renderer = new THREE.WebGPURenderer(props as any);
            await renderer.init();
            return renderer;
          }}
          className="absolute inset-0 z-0" // Canvas is z-0, ensuring it's at the bottom
        >
          <PostProcessing fullScreenEffect={true} />
          <Scene />
        </Canvas>

        {/* Button absolutely positioned at bottom center of hero section */}
        {/* Needs to be absolute and have a high z-index. */}
        <div className="absolute bottom-10  left-1/2 -translate-x-1/2  text-white z-[80] ">
          Global payroll made simple — automate payments, stay compliant, and focus on growth
        </div>
     
      </div>
    </div>
  );
};

export default Html;