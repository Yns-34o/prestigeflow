"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ===================== 3D FLOATING FOOD ORBS ===================== */
export const FloatingFoodCanvas = ({ colors = [0xff6b35, 0xffc107, 0xe53935], intensity = 1 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const group = new THREE.Group();
    scene.add(group);

    const spheres = [];
    for (let i = 0; i < 20; i++) {
      const geom = new THREE.SphereGeometry(Math.max(0.01, 0.1 + Math.random() * 0.2), 16, 16);
      const mat = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        roughness: 0.3,
        metalness: 0.6,
        transparent: true,
        opacity: 0.7 * intensity,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      );
      mesh.userData = {
        speed: 0.3 + Math.random() * 0.7,
        offset: Math.random() * Math.PI * 2,
        amplitude: 0.5 + Math.random(),
      };
      group.add(mesh);
      spheres.push(mesh);
    }

    const light = new THREE.PointLight(0xffffff, 2);
    light.position.set(2, 3, 4);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    let id;
    const animate = () => {
      id = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      spheres.forEach((s) => {
        s.position.y += Math.sin(t * s.userData.speed + s.userData.offset) * 0.003;
        s.position.x += Math.cos(t * s.userData.speed * 0.5 + s.userData.offset) * 0.002;
      });
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!canvas.parentElement) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, [colors, intensity]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    />
  );
};

/* ===================== 3D SAUCE WAVE CANVAS ===================== */
export const SauceWaveCanvas = ({ color1 = 0xff6b35, color2 = 0xffc107 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.PlaneGeometry(12, 12, 80, 80);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(color1) },
        uColor2: { value: new THREE.Color(color2) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform float uTime;
        void main() {
          vUv = uv;
          vec3 pos = position;
          float wave1 = sin(pos.x * 2.0 + uTime * 1.5) * 0.3;
          float wave2 = cos(pos.y * 1.5 + uTime * 1.2) * 0.2;
          float wave3 = sin(pos.x * 3.0 + pos.y * 2.0 + uTime) * 0.15;
          pos.z = wave1 + wave2 + wave3;
          vElevation = pos.z;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;
        void main() {
          float mix1 = sin(vUv.x * 6.28 + uTime) * 0.5 + 0.5;
          vec3 color = mix(uColor1, uColor2, mix1);
          float alpha = 0.6 * (0.5 + vElevation);
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 3;
    scene.add(mesh);

    let id;
    const animate = () => {
      id = requestAnimationFrame(animate);
      material.uniforms.uTime.value = Date.now() * 0.001;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
      renderer.dispose();
    };
  }, [color1, color2]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    />
  );
};

/* ===================== SECTION: MENU ===================== */
export const MenuSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.from(".ff-section-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
        x: -200,
        opacity: 0,
      });

      // Cards stagger reveal
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
          y: 100 + i * 30,
          rotationX: 15,
          opacity: 0,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const menuItems = [
    { name: "Le Classic Flow", desc: "Burger boeuf Angus, cheddar affin\u00e9, sauce maison, salade croquante", price: "16.90", tag: "Signature", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop" },
    { name: "Le Spicy Wave", desc: "Poulet croustillant, piment habanero, avocado frais, oignons caram\u00e9lis\u00e9s", price: "17.50", tag: "Populaire", img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&h=400&fit=crop" },
    { name: "Le Veggie Surge", desc: "Steak v\u00e9g\u00e9tal aux l\u00e9gumes grill\u00e9s, humume de betterave, roquette", price: "15.90", tag: "Veggie", img: "https://images.unsplash.com/photo-1520072959219-c595e6cdc07e?w=600&h=400&fit=crop" },
    { name: "Le Double Impact", desc: "Double steak hach\u00e9, double fromage, bacon fum\u00e9, sauce BBQ artisanale", price: "21.90", tag: "Premium", img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&h=400&fit=crop" },
    { name: "Le Cheese Tsunami", desc: "Trois fromages fondus, cro\u00fbte dor\u00e9e, confiture d'oignon maison", price: "18.50", tag: "Gourmand", img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&h=400&fit=crop" },
    { name: "Le Fish Flow", desc: "Filet de cabillaud pan\u00e9, coleslaw maison, sauce tartare citronn\u00e9e", price: "19.90", tag: "Mer", img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&h=400&fit=crop" },
  ];

  return (
    <section
      ref={sectionRef}
      id="menu"
      style={{
        position: "relative",
        padding: "120px 40px",
        background: "linear-gradient(180deg, #0a0a0a 0%, #1a0e05 50%, #0a0a0a 100%)",
        overflow: "hidden",
      }}
    >
      <FloatingFoodCanvas colors={[0xff6b35, 0xffc107, 0xd4881c]} intensity={0.4} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          className="ff-section-title"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 900,
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: "4px",
            marginBottom: "60px",
          }}
        >
          Notre <span style={{ color: "#ff6b35" }}>Menu</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "30px",
          }}
        >
          {menuItems.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,107,53,0.15)",
                borderRadius: "20px",
                overflow: "hidden",
                transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                cursor: "pointer",
                transform: "perspective(800px)",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "perspective(800px) rotateY(3deg) scale(1.03)";
                e.currentTarget.style.borderColor = "rgba(255,107,53,0.5)";
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(255,107,53,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "perspective(800px) rotateY(0) scale(1)";
                e.currentTarget.style.borderColor = "rgba(255,107,53,0.15)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                <img
                  src={item.img}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s ease",
                  }}
                  onMouseEnter={(e) => { e.target.style.transform = "scale(1.1)"; }}
                  onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "#ff6b35",
                    color: "#fff",
                    padding: "4px 14px",
                    borderRadius: "20px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "1px",
                  }}
                >
                  {item.tag}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "80px",
                    background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                  }}
                />
              </div>
              <div style={{ padding: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    {item.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "1.4rem",
                      fontWeight: 800,
                      color: "#ff6b35",
                    }}
                  >
                    {item.price}&euro;
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ===================== SECTION: ABOUT ===================== */
export const AboutSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ff-about-img", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 1,
        },
        x: -150,
        rotation: -5,
        opacity: 0,
        scale: 0.8,
      });

      gsap.from(".ff-about-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 20%",
          scrub: 1,
        },
        x: 150,
        opacity: 0,
      });

      // Counter animation
      gsap.from(".ff-stat", {
        scrollTrigger: {
          trigger: ".ff-stats-row",
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
        y: 80,
        opacity: 0,
        stagger: 0.15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        position: "relative",
        padding: "120px 40px",
        background: "#0a0a0a",
        overflow: "hidden",
      }}
    >
      <SauceWaveCanvas color1={0xff6b35} color2={0xffc107} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "60px", alignItems: "center", flexWrap: "wrap" }}>
          <div className="ff-about-img" style={{ flex: "1 1 400px", position: "relative" }}>
            <div
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 40px 80px rgba(255,107,53,0.2)",
                transform: "perspective(800px) rotateY(-5deg)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=700&h=500&fit=crop"
                alt="Restaurant FlowFood"
                style={{ width: "100%", display: "block" }}
              />
            </div>
            {/* Floating badge */}
            <div
              style={{
                position: "absolute",
                bottom: "-20px",
                right: "-20px",
                background: "linear-gradient(135deg, #ff6b35, #ff8c00)",
                borderRadius: "20px",
                padding: "24px",
                boxShadow: "0 20px 40px rgba(255,107,53,0.3)",
              }}
            >
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2.5rem", fontWeight: 900, color: "#fff" }}>
                12+
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.8)" }}>
                Ans d&apos;exp&eacute;rience
              </div>
            </div>
          </div>

          <div className="ff-about-text" style={{ flex: "1 1 400px" }}>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 900,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "24px",
                lineHeight: 1.2,
              }}
            >
              Notre <span style={{ color: "#ff6b35" }}>Histoire</span>
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.1rem",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.8,
                marginBottom: "20px",
              }}
            >
              N&eacute;e de la passion pour l&apos;excellence culinaire, <strong style={{ color: "#ff6b35" }}>FlowFood</strong> r&eacute;volutionne
              l&apos;art du burger depuis 2012. Chaque cr&eacute;ation est une symphonie de saveurs, o&ugrave; les
              ingr&eacute;dients les plus frais rencontrent l&apos;innovation gastronomique.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.8,
                marginBottom: "40px",
              }}
            >
              Notre chef étoilé compose des burgers qui transcendent les frontières du fast-food,
              en alliant techniques de cuisine gastronomique et amour du produit brut.
            </p>

            <div
              className="ff-stats-row"
              style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}
            >
              {[
                { value: "50K+", label: "Burgers servis" },
                { value: "4.9", label: "Note Google" },
                { value: "15", label: "Sauces maison" },
                { value: "100%", label: "Produits frais" },
              ].map((stat, i) => (
                <div key={i} className="ff-stat">
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "2rem",
                      fontWeight: 800,
                      color: "#ff6b35",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===================== SECTION: CHEF ===================== */
export const ChefSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ff-chef-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
        scale: 0.7,
        rotation: 10,
        opacity: 0,
      });

      gsap.from(".ff-chef-quote", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "top 20%",
          scrub: 1,
        },
        y: 80,
        opacity: 0,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="chef"
      style={{
        position: "relative",
        padding: "120px 40px",
        background: "linear-gradient(180deg, #0a0a0a, #120800, #0a0a0a)",
        overflow: "hidden",
      }}
    >
      <FloatingFoodCanvas colors={[0xffc107, 0xff1744, 0xff6b35]} intensity={0.3} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 900,
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: "4px",
            marginBottom: "60px",
          }}
        >
          Notre <span style={{ color: "#ff6b35" }}>Chef</span>
        </h2>

        <div
          className="ff-chef-card"
          style={{
            position: "relative",
            display: "inline-block",
            borderRadius: "30px",
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(255,107,53,0.25)",
            border: "2px solid rgba(255,107,53,0.2)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=750&fit=crop"
            alt="Chef FlowFood"
            style={{ display: "block", width: "100%", maxWidth: "450px" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "40px 30px 30px",
              background: "linear-gradient(transparent, rgba(0,0,0,0.9))",
            }}
          >
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 4px",
              }}
            >
              Chef Laurent Moreau
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                color: "#ff6b35",
                margin: 0,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Chef &Eacute;toil&eacute; &bull; 2 &Eacute;toiles Michelin
            </p>
          </div>
        </div>

        <div
          className="ff-chef-quote"
          style={{ marginTop: "50px", maxWidth: "700px", margin: "50px auto 0" }}
        >
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.8)",
              fontStyle: "italic",
              lineHeight: 1.6,
            }}
          >
            &laquo; Un burger n&apos;est pas juste un repas, c&apos;est une toile sur laquelle
            on peint des &eacute;motions. Chaque bouch&eacute;e doit raconter une histoire. &raquo;
          </p>
        </div>
      </div>
    </section>
  );
};

/* ===================== SECTION: RESERVATION ===================== */
export const ReservationSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ff-reservation-left", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        },
        x: -100,
        opacity: 0,
      });

      gsap.from(".ff-reservation-right", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 25%",
          scrub: 1,
        },
        x: 100,
        opacity: 0,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reservation"
      style={{
        position: "relative",
        padding: "120px 40px",
        background: "#0a0a0a",
        overflow: "hidden",
      }}
    >
      <SauceWaveCanvas color1={0xe53935} color2={0xff6b35} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "60px", alignItems: "flex-start", flexWrap: "wrap" }}>
          <div className="ff-reservation-left" style={{ flex: "1 1 400px" }}>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 900,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "24px",
              }}
            >
              R&eacute;servez votre <span style={{ color: "#ff6b35" }}>Table</span>
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.8,
                marginBottom: "40px",
              }}
            >
              Vivez l&apos;exp&eacute;rience FlowFood. R&eacute;servez d&egrave;s maintenant et laissez-vous
              surprendre par des saveurs qui d&eacute;fient l&apos;ordinaire.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { icon: "📍", text: "42 Rue de la Gastronomie, Paris 8e" },
                { icon: "📞", text: "+33 1 42 00 00 00" },
                { icon: "🕐", text: "Lun-Dim : 11h30 - 23h00" },
                { icon: "✉️", text: "contact@flowfood.paris" },
              ].map((info, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1rem",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <span style={{ fontSize: "1.3rem" }}>{info.icon}</span>
                  {info.text}
                </div>
              ))}
            </div>
          </div>

          <div
            className="ff-reservation-right"
            style={{
              flex: "1 1 400px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,107,53,0.15)",
              borderRadius: "24px",
              padding: "40px",
              backdropFilter: "blur(10px)",
            }}
          >
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {[
                { label: "Nom complet", type: "text", placeholder: "Jean Dupont" },
                { label: "Email", type: "email", placeholder: "jean@example.com" },
                { label: "T&eacute;l&eacute;phone", type: "tel", placeholder: "+33 6 00 00 00 00" },
              ].map((field, i) => (
                <div key={i}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.6)",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                    dangerouslySetInnerHTML={{ __html: field.label }}
                  />
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,107,53,0.2)",
                      borderRadius: "12px",
                      color: "#fff",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1rem",
                      outline: "none",
                      transition: "border-color 0.3s, box-shadow 0.3s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#ff6b35";
                      e.target.style.boxShadow = "0 0 20px rgba(255,107,53,0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,107,53,0.2)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              ))}

              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.6)",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,107,53,0.2)",
                      borderRadius: "12px",
                      color: "#fff",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1rem",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.6)",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Personnes
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "14px 18px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,107,53,0.2)",
                      borderRadius: "12px",
                      color: "#fff",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1rem",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n} style={{ background: "#1a1a1a" }}>
                        {n} {n === 1 ? "personne" : "personnes"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  marginTop: "10px",
                  padding: "18px",
                  background: "linear-gradient(135deg, #ff6b35, #ff8c00)",
                  border: "none",
                  borderRadius: "14px",
                  color: "#fff",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 10px 30px rgba(255,107,53,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow = "0 15px 40px rgba(255,107,53,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 10px 30px rgba(255,107,53,0.3)";
                }}
              >
                R&eacute;server maintenant
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===================== SECTION: INSTAGRAM FEED ===================== */
export const InstagramSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ff-insta-img", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 30%",
          scrub: 1,
        },
        y: 120,
        opacity: 0,
        rotation: () => (Math.random() - 0.5) * 20,
        stagger: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const images = [
    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1565298062167-6b06d0c61644?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1608767221590-f6d4d41e806a?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=400&fit=crop",
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "80px 40px",
        background: "#0a0a0a",
        overflow: "hidden",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 900,
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: "4px",
          }}
        >
          @Flow<span style={{ color: "#ff6b35" }}>Food</span>
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.9rem",
            letterSpacing: "2px",
          }}
        >
          Suivez-nous sur Instagram
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "12px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="ff-insta-img"
            style={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              aspectRatio: "1",
              cursor: "pointer",
            }}
          >
            <img
              src={img}
              alt={`Instagram ${i + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
              }}
              onMouseEnter={(e) => { e.target.style.transform = "scale(1.15)"; }}
              onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(255,107,53,0)",
                transition: "background 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,107,53,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,107,53,0)"; }}
            >
              <span style={{ fontSize: "2rem", opacity: 0, transition: "opacity 0.3s" }}
                onMouseEnter={(e) => { e.target.style.opacity = "1"; }}
                onMouseLeave={(e) => { e.target.style.opacity = "0"; }}
              >
                ♥
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ===================== FOOTER ===================== */
export const FlowFoodFooter = () => {
  return (
    <footer
      style={{
        position: "relative",
        padding: "60px 40px 30px",
        background: "linear-gradient(180deg, #0a0a0a, #050505)",
        borderTop: "1px solid rgba(255,107,53,0.1)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", marginBottom: "40px" }}>
          <div style={{ flex: "1 1 250px" }}>
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Flow<span style={{ color: "#ff6b35" }}>Food</span>
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.7,
              }}
            >
              L&apos;art du burger r&eacute;invent&eacute;. Une exp&eacute;rience culinaire
              hors du commun au c&oelig;ur de Paris.
            </p>
          </div>

          <div style={{ flex: "1 1 150px" }}>
            <h4
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "16px",
              }}
            >
              Navigation
            </h4>
            {["Menu", "A propos", "Notre Chef", "R&eacute;servation"].map(
              (item, i) => (
                <a
                  key={i}
                  href={`#${["menu", "about", "chef", "reservation"][i]}`}
                  style={{
                    display: "block",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    marginBottom: "10px",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#ff6b35";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "rgba(255,255,255,0.5)";
                  }}
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              )
            )}
          </div>

          <div style={{ flex: "1 1 200px" }}>
            <h4
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "16px",
              }}
            >
              Horaires
            </h4>
            {[
              "Lun - Ven : 11h30 - 23h",
              "Samedi : 12h - 00h",
              "Dimanche : 12h - 22h",
            ].map((h, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.5)",
                  margin: "0 0 8px",
                }}
              >
                {h}
              </p>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "20px",
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          &copy; 2026 FlowFood. Tous droits r&eacute;serv&eacute;s. Fait avec passion &agrave; Paris.
        </div>
      </div>
    </footer>
  );
};
