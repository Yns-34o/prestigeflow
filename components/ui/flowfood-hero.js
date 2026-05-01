"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Component = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const navRef = useRef(null);

  const threeRefs = useRef({
    scene: null,
    camera: null,
    renderer: null,
    burgerGroup: null,
    sauceParticles: [],
    bgParticles: null,
    ambientLights: [],
    animationId: null,
    clock: null,
    sauceJets: [],
  });

  useEffect(() => {
    const initThree = () => {
      const refs = threeRefs.current;
      refs.clock = new THREE.Clock();

      // Scene
      refs.scene = new THREE.Scene();
      refs.scene.background = new THREE.Color(0x0a0a0a);
      refs.scene.fog = new THREE.FogExp2(0x0a0a0a, 0.0015);

      // Camera
      refs.camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        3000
      );
      refs.camera.position.set(0, 0, 12);

      // Renderer
      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 1.2;
      refs.renderer.shadowMap.enabled = true;
      refs.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // Lighting
      createLighting(refs);
      // Burger
      createBurger(refs);
      // Sauce jets
      createSauceJets(refs);
      // Background particles
      createBackgroundParticles(refs);
      // Smoke/steam
      createSteam(refs);

      animate(refs);
    };

    const createLighting = (refs) => {
      // Warm ambient
      const ambient = new THREE.AmbientLight(0xffa040, 0.4);
      refs.scene.add(ambient);
      refs.ambientLights.push(ambient);

      // Key light - warm orange
      const keyLight = new THREE.DirectionalLight(0xff8c00, 2.0);
      keyLight.position.set(5, 8, 5);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      refs.scene.add(keyLight);
      refs.ambientLights.push(keyLight);

      // Fill light - soft warm
      const fillLight = new THREE.DirectionalLight(0xffcc66, 0.8);
      fillLight.position.set(-5, 3, 5);
      refs.scene.add(fillLight);
      refs.ambientLights.push(fillLight);

      // Rim light - reddish
      const rimLight = new THREE.PointLight(0xff4400, 1.5, 20);
      rimLight.position.set(0, -2, -5);
      refs.scene.add(rimLight);
      refs.ambientLights.push(rimLight);

      // Top spot
      const spot = new THREE.SpotLight(0xffffff, 2.0, 30, Math.PI / 4, 0.5, 1);
      spot.position.set(0, 10, 3);
      spot.target.position.set(0, 0, 0);
      refs.scene.add(spot);
      refs.scene.add(spot.target);
      refs.ambientLights.push(spot);
    };

    const createBurger = (refs) => {
      const burgerGroup = new THREE.Group();

      // Bun top - dome shape
      const bunTopGeom = new THREE.SphereGeometry(
        Math.max(0.01, 2.2),
        32,
        32,
        0,
        Math.PI * 2,
        0,
        Math.PI / 2
      );
      const bunTopMat = new THREE.MeshStandardMaterial({
        color: 0xd4881c,
        roughness: 0.7,
        metalness: 0.05,
      });
      const bunTop = new THREE.Mesh(bunTopGeom, bunTopMat);
      bunTop.position.y = 0.8;
      bunTop.castShadow = true;

      // Sesame seeds on top
      const seedGeom = new THREE.SphereGeometry(Math.max(0.01, 0.08), 8, 8);
      const seedMat = new THREE.MeshStandardMaterial({
        color: 0xf5e6c8,
        roughness: 0.5,
      });
      for (let i = 0; i < 25; i++) {
        const seed = new THREE.Mesh(seedGeom, seedMat);
        const phi = Math.random() * Math.PI * 0.4;
        const theta = Math.random() * Math.PI * 2;
        const r = 2.0;
        seed.position.set(
          r * Math.sin(phi) * Math.cos(theta),
          0.8 + r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        );
        seed.scale.set(1, 0.5, 1.5);
        seed.lookAt(0, 2, 0);
        burgerGroup.add(seed);
      }

      // Lettuce - wavy disc
      const lettuceShape = new THREE.Shape();
      const lettucePoints = 64;
      for (let i = 0; i <= lettucePoints; i++) {
        const angle = (i / lettucePoints) * Math.PI * 2;
        const r = 2.3 + Math.sin(angle * 8) * 0.15;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        if (i === 0) lettuceShape.moveTo(x, y);
        else lettuceShape.lineTo(x, y);
      }
      const lettuceGeom = new THREE.ExtrudeGeometry(lettuceShape, {
        depth: 0.15,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 3,
      });
      const lettuceMat = new THREE.MeshStandardMaterial({
        color: 0x4caf50,
        roughness: 0.8,
        metalness: 0.0,
      });
      const lettuce = new THREE.Mesh(lettuceGeom, lettuceMat);
      lettuce.rotation.x = -Math.PI / 2;
      lettuce.position.y = 0.3;
      lettuce.castShadow = true;

      // Cheese - melted draping
      const cheeseGeom = new THREE.BoxGeometry(
        Math.max(0.01, 4.4),
        Math.max(0.01, 0.12),
        Math.max(0.01, 4.4)
      );
      const cheeseMat = new THREE.MeshStandardMaterial({
        color: 0xffc107,
        roughness: 0.4,
        metalness: 0.1,
      });
      const cheese = new THREE.Mesh(cheeseGeom, cheeseMat);
      cheese.position.y = 0.1;
      cheese.rotation.y = Math.PI / 4;
      cheese.castShadow = true;

      // Cheese drapes
      for (let i = 0; i < 4; i++) {
        const drapeGeom = new THREE.CylinderGeometry(
          Math.max(0.01, 0.15),
          Math.max(0.01, 0.05),
          Math.max(0.01, 0.8),
          8
        );
        const drape = new THREE.Mesh(drapeGeom, cheeseMat);
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 8;
        drape.position.set(
          Math.cos(angle) * 1.8,
          -0.2,
          Math.sin(angle) * 1.8
        );
        drape.rotation.z = Math.cos(angle) * 0.3;
        drape.castShadow = true;
        burgerGroup.add(drape);
      }

      // Patty - thick disc
      const pattyGeom = new THREE.CylinderGeometry(
        Math.max(0.01, 2.0),
        Math.max(0.01, 2.1),
        Math.max(0.01, 0.6),
        32
      );
      const pattyMat = new THREE.MeshStandardMaterial({
        color: 0x5d3a1a,
        roughness: 0.9,
        metalness: 0.0,
      });
      const patty = new THREE.Mesh(pattyGeom, pattyMat);
      patty.position.y = -0.25;
      patty.castShadow = true;

      // Tomato slices
      const tomatoGeom = new THREE.CylinderGeometry(
        Math.max(0.01, 1.8),
        Math.max(0.01, 1.8),
        Math.max(0.01, 0.15),
        32
      );
      const tomatoMat = new THREE.MeshStandardMaterial({
        color: 0xe53935,
        roughness: 0.6,
        metalness: 0.05,
      });
      const tomato = new THREE.Mesh(tomatoGeom, tomatoMat);
      tomato.position.y = -0.65;
      tomato.castShadow = true;

      // Onion rings
      const onionGeom = new THREE.TorusGeometry(
        Math.max(0.01, 1.2),
        Math.max(0.01, 0.15),
        16,
        32
      );
      const onionMat = new THREE.MeshStandardMaterial({
        color: 0xf3e5f5,
        roughness: 0.4,
        metalness: 0.0,
        transparent: true,
        opacity: 0.85,
      });
      for (let i = 0; i < 3; i++) {
        const onion = new THREE.Mesh(onionGeom, onionMat);
        onion.position.y = -0.85;
        onion.rotation.x = Math.PI / 2;
        onion.rotation.y = (i / 3) * Math.PI;
        onion.position.x = Math.cos((i / 3) * Math.PI * 2) * 0.5;
        onion.position.z = Math.sin((i / 3) * Math.PI * 2) * 0.5;
        burgerGroup.add(onion);
      }

      // Bun bottom - flat cylinder
      const bunBottomGeom = new THREE.CylinderGeometry(
        Math.max(0.01, 2.3),
        Math.max(0.01, 2.4),
        Math.max(0.01, 0.5),
        32
      );
      const bunBottomMat = new THREE.MeshStandardMaterial({
        color: 0xc47a15,
        roughness: 0.75,
        metalness: 0.05,
      });
      const bunBottom = new THREE.Mesh(bunBottomGeom, bunBottomMat);
      bunBottom.position.y = -1.2;
      bunBottom.castShadow = true;

      // Assemble burger
      burgerGroup.add(bunTop);
      burgerGroup.add(lettuce);
      burgerGroup.add(cheese);
      burgerGroup.add(patty);
      burgerGroup.add(tomato);
      burgerGroup.add(bunBottom);

      // Scale up
      burgerGroup.scale.set(1.5, 1.5, 1.5);

      refs.scene.add(burgerGroup);
      refs.burgerGroup = burgerGroup;
    };

    const createSauceJets = (refs) => {
      const sauceColors = [
        { color: 0xff1744, name: "ketchup" },
        { color: 0xffc107, name: "mustard" },
        { color: 0x4caf50, name: "sauce_verte" },
        { color: 0xff6d00, name: "sauce_epicee" },
        { color: 0xe0e0e0, name: "mayo" },
      ];

      sauceColors.forEach((sauce, idx) => {
        const particleCount = 300;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        const lifetimes = new Float32Array(particleCount);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] = 0;
          positions[i * 3 + 1] = 0;
          positions[i * 3 + 2] = 0;
          velocities[i * 3] = (Math.random() - 0.5) * 0.15;
          velocities[i * 3 + 1] = Math.random() * 0.2 + 0.05;
          velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
          lifetimes[i] = Math.random();
          sizes[i] = Math.random() * 0.15 + 0.05;
        }

        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );
        geometry.setAttribute(
          "size",
          new THREE.BufferAttribute(sizes, 1)
        );

        const material = new THREE.ShaderMaterial({
          uniforms: {
            uColor: { value: new THREE.Color(sauce.color) },
            uTime: { value: 0 },
            uOpacity: { value: 0.0 },
          },
          vertexShader: `
            attribute float size;
            uniform float uTime;
            varying float vAlpha;
            void main() {
              vAlpha = size / 0.2;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * (200.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            uniform vec3 uColor;
            uniform float uOpacity;
            varying float vAlpha;
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              float alpha = (1.0 - smoothstep(0.1, 0.5, dist)) * vAlpha * uOpacity;
              gl_FragColor = vec4(uColor, alpha);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const particles = new THREE.Points(geometry, material);
        refs.scene.add(particles);

        refs.sauceJets.push({
          mesh: particles,
          velocities,
          lifetimes,
          basePositions: positions.slice(),
          color: sauce.color,
          angle: (idx / sauceColors.length) * Math.PI * 2,
          radius: 5 + idx * 1.5,
          speed: 0.3 + idx * 0.1,
        });
      });
    };

    const createBackgroundParticles = (refs) => {
      const count = 2000;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      const palette = [
        new THREE.Color(0xff6b35),
        new THREE.Color(0xff1744),
        new THREE.Color(0xffc107),
        new THREE.Color(0xd4881c),
      ];

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10;

        const c = palette[Math.floor(Math.random() * palette.length)];
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
        sizes[i] = Math.random() * 3 + 0.5;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colors, 3)
      );
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uScroll: { value: 0 },
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          varying float vDist;
          uniform float uTime;
          uniform float uScroll;
          void main() {
            vColor = color;
            vec3 pos = position;
            pos.y += uScroll * 20.0;
            pos.x += sin(uTime * 0.2 + position.x * 0.1) * 0.5;
            pos.y += cos(uTime * 0.15 + position.z * 0.1) * 0.3;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            vDist = -mvPosition.z;
            gl_PointSize = size * (150.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vDist;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = (1.0 - smoothstep(0.0, 0.5, dist)) * 0.4;
            float fog = smoothstep(40.0, 60.0, vDist);
            alpha *= (1.0 - fog);
            gl_FragColor = vec4(vColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      refs.scene.add(points);
      refs.bgParticles = points;
    };

    const createSteam = (refs) => {
      const count = 150;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 3;
        positions[i * 3 + 1] = 3 + Math.random() * 2;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
        velocities[i * 3] = (Math.random() - 0.5) * 0.01;
        velocities[i * 3 + 1] = Math.random() * 0.02 + 0.01;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
        sizes[i] = Math.random() * 1.5 + 0.5;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: 0.3 },
        },
        vertexShader: `
          attribute float size;
          uniform float uTime;
          varying float vAlpha;
          void main() {
            vec3 pos = position;
            pos.y += sin(uTime * 0.5 + position.x * 2.0) * 0.3;
            pos.x += cos(uTime * 0.3 + position.z * 2.0) * 0.2;
            vAlpha = 1.0 - (pos.y - 3.0) / 5.0;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (100.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform float uOpacity;
          varying float vAlpha;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = (1.0 - smoothstep(0.0, 0.5, dist)) * vAlpha * uOpacity;
            gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const steam = new THREE.Points(geometry, material);
      refs.scene.add(steam);
      refs.steamParticles = { mesh: steam, velocities };
    };

    const animate = (refs) => {
      refs.animationId = requestAnimationFrame(() => animate(refs));
      const elapsed = refs.clock.getElapsedTime();

      // Rotate burger
      if (refs.burgerGroup) {
        refs.burgerGroup.rotation.y = elapsed * 0.3;
        refs.burgerGroup.rotation.x =
          Math.sin(elapsed * 0.2) * 0.1;
        // Floating bob
        refs.burgerGroup.position.y =
          Math.sin(elapsed * 0.5) * 0.2;
      }

      // Animate sauce jets
      refs.sauceJets.forEach((jet, idx) => {
        const positions = jet.mesh.geometry.attributes.position.array;
        const count = positions.length / 3;

        for (let i = 0; i < count; i++) {
          jet.lifetimes[i] += 0.008;
          if (jet.lifetimes[i] > 1) {
            jet.lifetimes[i] = 0;
            // Reset position to jet origin
            const angle = jet.angle + elapsed * jet.speed;
            positions[i * 3] =
              Math.cos(angle) * jet.radius + (Math.random() - 0.5) * 0.5;
            positions[i * 3 + 1] =
              (Math.random() - 0.5) * 2;
            positions[i * 3 + 2] =
              Math.sin(angle) * jet.radius + (Math.random() - 0.5) * 0.5;
          } else {
            // Spiral outward
            const life = jet.lifetimes[i];
            const angle = jet.angle + elapsed * jet.speed + life * 2;
            positions[i * 3] += Math.cos(angle) * 0.03;
            positions[i * 3 + 1] += jet.velocities[i * 3 + 1] * (1 - life);
            positions[i * 3 + 2] += Math.sin(angle) * 0.03;
          }
        }
        jet.mesh.geometry.attributes.position.needsUpdate = true;
        jet.mesh.material.uniforms.uTime.value = elapsed;
      });

      // BG particles
      if (refs.bgParticles) {
        refs.bgParticles.material.uniforms.uTime.value = elapsed;
      }

      // Steam
      if (refs.steamParticles) {
        const steamPos =
          refs.steamParticles.mesh.geometry.attributes.position.array;
        const steamVel = refs.steamParticles.velocities;
        for (let i = 0; i < steamPos.length / 3; i++) {
          steamPos[i * 3] += steamVel[i * 3];
          steamPos[i * 3 + 1] += steamVel[i * 3 + 1];
          steamPos[i * 3 + 2] += steamVel[i * 3 + 2];
          if (steamPos[i * 3 + 1] > 8) {
            steamPos[i * 3] = (Math.random() - 0.5) * 3;
            steamPos[i * 3 + 1] = 3 + Math.random();
            steamPos[i * 3 + 2] = (Math.random() - 0.5) * 3;
          }
        }
        refs.steamParticles.mesh.geometry.attributes.position.needsUpdate = true;
        refs.steamParticles.mesh.material.uniforms.uTime.value = elapsed;
      }

      refs.renderer.render(refs.scene, refs.camera);
    };

    initThree();

    const handleResize = () => {
      const refs = threeRefs.current;
      if (refs.camera && refs.renderer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      const refs = threeRefs.current;
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener("resize", handleResize);
      if (refs.renderer) refs.renderer.dispose();
    };
  }, []);

  // GSAP scroll animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animations
      const tl = gsap.timeline({ delay: 0.3 });

      if (navRef.current) {
        tl.from(navRef.current, {
          y: -60,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
        });
      }

      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".ff-char");
        tl.from(
          chars,
          {
            y: 120,
            rotationX: -90,
            opacity: 0,
            duration: 1.0,
            stagger: 0.04,
            ease: "power4.out",
          },
          "-=0.6"
        );
      }

      if (subtitleRef.current) {
        tl.from(
          subtitleRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }

      if (scrollIndicatorRef.current) {
        tl.from(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }

      // Scroll-triggered burger descent + sauce activation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          pin: false,
        },
      });

      // Move burger down and scale up as user scrolls
      if (threeRefs.current.burgerGroup) {
        scrollTl.to(
          threeRefs.current.burgerGroup.position,
          {
            y: -15,
            duration: 1,
          },
          0
        );
        scrollTl.to(
          threeRefs.current.burgerGroup.scale,
          {
            x: 2.5,
            y: 2.5,
            z: 2.5,
            duration: 1,
          },
          0
        );
      }

      // Activate sauce jets based on scroll
      scrollTl.to(
        {},
        {
          duration: 1,
          onUpdate: function () {
            const progress = this.progress();
            threeRefs.current.sauceJets.forEach((jet) => {
              jet.mesh.material.uniforms.uOpacity.value = Math.min(
                progress * 2,
                0.8
              );
            });
            // Move camera back
            if (threeRefs.current.camera) {
              threeRefs.current.camera.position.z = 12 - progress * 5;
            }
            // Fade bg particles
            if (threeRefs.current.bgParticles) {
              threeRefs.current.bgParticles.material.uniforms.uScroll.value =
                progress;
            }
          },
        },
        0
      );

      // Fade out overlay text on scroll
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          y: -100,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "30% top",
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text) => {
    return text.split("").map((char, i) => (
      <span key={i} className="ff-char" style={{ display: "inline-block" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      className="ff-hero-container"
      style={{
        position: "relative",
        width: "100%",
        height: "200vh",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0,
        }}
      />

      {/* Overlay content */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 10,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Nav */}
        <nav
          ref={navRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            padding: "24px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pointerEvents: "auto",
          }}
        >
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Flow<span style={{ color: "#ff6b35" }}>Food</span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "32px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            <a href="#menu" style={{ color: "inherit", textDecoration: "none" }}>
              Menu
            </a>
            <a href="#about" style={{ color: "inherit", textDecoration: "none" }}>
              A propos
            </a>
            <a href="#chef" style={{ color: "inherit", textDecoration: "none" }}>
              Notre Chef
            </a>
            <a
              href="#reservation"
              style={{
                color: "#ff6b35",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Reservation
            </a>
          </div>
        </nav>

        {/* Title */}
        <div style={{ textAlign: "center" }}>
          <h1
            ref={titleRef}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 900,
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "8px",
              margin: 0,
              lineHeight: 1,
              textShadow: "0 0 60px rgba(255,107,53,0.3)",
            }}
          >
            {splitText("FLOWFOOD")}
          </h1>
          <p
            ref={subtitleRef}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              color: "rgba(255,255,255,0.7)",
              marginTop: "20px",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            L&apos;art du burger r&eacute;invent&eacute;
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background:
                "linear-gradient(to bottom, rgba(255,107,53,0.8), transparent)",
              animation: "ffPulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
};
