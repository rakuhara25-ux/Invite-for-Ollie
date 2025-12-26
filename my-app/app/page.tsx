'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);


  const handleEnvelopeClick = () => {
    if (!envelopeOpened) {
      setEnvelopeOpened(true);

      if (audio) {
        audio.play();
      }
      // Hide envelope and show content after zoom animation completes
      setTimeout(() => {
        setShowContent(true);
      }, 1200); // 1s zoom animation + 200ms buffer
    }
  };

  useEffect(() => {
    const bgm = new Audio('/フルハウス.mp3');
    bgm.loop = true;
    bgm.volume = 0.5;
    setAudio(bgm);

    setMounted(true);

    // Create snowflakes
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      snowflake.innerHTML = '❄';
      snowflake.style.left = Math.random() * 100 + 'vw';
      snowflake.style.animationDuration = Math.random() * 3 + 8 + 's';
      snowflake.style.animationDelay = Math.random() * 5 + 's';
      snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
      snowflake.style.opacity = (Math.random() * 0.6 + 0.3).toString();
      document.body.appendChild(snowflake);

      setTimeout(() => {
        snowflake.remove();
      }, 15000);
    };

    // Create initial snowflakes
    for (let i = 0; i < 30; i++) {
      setTimeout(createSnowflake, i * 200);
    }

    // Continue creating snowflakes
    const interval = setInterval(createSnowflake, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Envelope Opening Animation */}
      <div className={`envelope-container ${showContent ? 'hidden' : ''}`}>
        <div
          className={`envelope-wrapper ${envelopeOpened ? 'opening opened' : ''}`}
          onClick={handleEnvelopeClick}
        >
          <div className="envelope">
            <div className="envelope-back">
              {/* Message on envelope surface */}
              {!envelopeOpened && (
                <div className="envelope-message">
                  <div className="envelope-message-icon"> </div>
                  <h3 className="envelope-message-title">ご招待</h3>
                  <p className="envelope-message-subtitle">You're Invited</p>
                  <p className="envelope-message-to">Dear Ollie</p>
                </div>
              )}
            </div>
            <div className="envelope-flap">
              <div className="envelope-flap-front"></div>
              <div className="envelope-flap-back"></div>
            </div>
          </div>
          {!envelopeOpened && (
            <div className="tap-hint">
              ✨ タップして開く / Tap to open ✨
            </div>
          )}
        </div>
      </div>

      {/* Background Photo Slideshow */}
      <div className="background-slideshow">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="slideshow-image"
            style={{
              background: `linear-gradient(${45 + i * 36}deg, 
                hsl(${200 + i * 15}, 70%, ${40 + i * 5}%), 
                hsl(${220 + i * 15}, 60%, ${30 + i * 3}%))`,
              animationDelay: `${i * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Invitation Content */}
      <div className={`main-content ${showContent ? 'visible' : ''}`}>
        {/* Hero Section */}
        <section className="hero-section" style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '2rem 0'
        }}>
          <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <div className={`fade-in-up ${mounted ? '' : ''}`} style={{ animationDelay: '0.2s', opacity: mounted ? 1 : 0 }}>
              <h1 className="japanese-text bold glow-text" style={{
                fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                marginBottom: '1rem',
                letterSpacing: '0.05em'
              }}>
                お別れパーティー
              </h1>
              <p style={{
                fontSize: 'clamp(1.2rem, 5vw, 2rem)',
                fontFamily: 'var(--font-english)',
                color: 'var(--color-ice-light)',
                marginBottom: '2rem',
                fontStyle: 'italic'
              }}>
                Farewell Party for
              </p>
              <h2 className="glow-text" style={{
                fontSize: 'clamp(2.5rem, 10vw, 4rem)',
                fontFamily: 'var(--font-english)',
                background: 'linear-gradient(135deg, #5bc0be 0%, #6fffe9 50%, #ff6b9d 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '3rem',
                fontWeight: 700
              }}>
                Ollie Ehemann
              </h2>
            </div>

            <div className={`fade-in-up ${mounted ? '' : ''}`} style={{ animationDelay: '0.6s', opacity: mounted ? 1 : 0 }}>
              <div className="glass-card" style={{
                padding: '2rem',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                <p className="japanese-text" style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  marginBottom: '1.5rem'
                }}>
                  もうすぐオーストラリアに帰る<br />
                  大切な友達との<br />
                  冬の夜の思い出を
                </p>
                <div style={{
                  height: '2px',
                  width: '60px',
                  background: 'linear-gradient(90deg, var(--color-ice-blue), var(--color-ice-light))',
                  margin: '1.5rem auto',
                  borderRadius: '2px'
                }} />
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-silver)',
                  fontFamily: 'var(--font-body)'
                }}>
                  A winter night to remember<br />
                  our cherished moments together
                </p>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="float" style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            fontSize: '4rem',
            opacity: 0.1,
            pointerEvents: 'none'
          }}>
            ❄️
          </div>
          <div className="float" style={{
            position: 'absolute',
            bottom: '15%',
            left: '8%',
            fontSize: '3rem',
            opacity: 0.1,
            animationDelay: '2s',
            pointerEvents: 'none'
          }}>
            ✨
          </div>
        </section>

        {/* Event Details Section */}
        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <h3 className="japanese-text bold" style={{
              fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
              textAlign: 'center',
              marginBottom: '3rem',
              color: 'var(--color-ice-light)'
            }}>
              イベント詳細
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Date & Time */}
              <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '2rem' }}>📅</span>
                  <h4 className="japanese-text bold" style={{ fontSize: '1.3rem', color: 'var(--color-ice-blue)' }}>
                    日時
                  </h4>
                </div>
                <p className="japanese-text" style={{ fontSize: '1.1rem', marginLeft: '3rem', lineHeight: 1.6 }}>
                  2025年12月27日（土）<br />
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-silver)' }}>
                    December 27th, 2025 (Saturday)
                  </span>
                </p>
              </div>

              {/* Host */}
              <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '2rem' }}>🎉</span>
                  <h4 className="japanese-text bold" style={{ fontSize: '1.3rem', color: 'var(--color-ice-blue)' }}>
                    主催者
                  </h4>
                </div>
                <p className="japanese-text" style={{ fontSize: '1.1rem', marginLeft: '3rem' }}>
                  <a
                    href="https://rakunoheya.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--color-ice-blue)',
                      textDecoration: 'underline'
                    }}
                  >
                    原嶋 樂  Official Website
                  </a>
                  <br />

                  <span style={{ fontSize: '0.9rem', color: 'var(--color-silver)' }}>
                    Raku Harashima
                  </span>
                </p>
              </div>

              {/* Message */}
              <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2rem' }}>💌</span>
                  <h4 className="japanese-text bold" style={{ fontSize: '1.3rem', color: 'var(--color-ice-blue)' }}>
                    メッセージ
                  </h4>
                </div>
                <p className="japanese-text" style={{
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  marginLeft: '3rem',
                  color: 'var(--color-snow)'
                }}>
                  ありがとう！そしてお疲れ様！<br />
                  今までの素敵な思い出に感謝を込めて<br />
                  冬の夜に、みんなで最高の時間を過ごそう！
                </p>
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  marginLeft: '3rem',
                  marginTop: '1rem',
                  color: 'var(--color-silver)',
                  fontStyle: 'italic'
                }}>
                  Thanks for everything! You did awesome!<br />
                  Cherishing all the wonderful memories.<br />
                  Let's make this winter night unforgettable!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Venue Section */}
        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <h3 className="japanese-text bold" style={{
              fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
              textAlign: 'center',
              marginBottom: '3rem',
              color: 'var(--color-ice-light)'
            }}>
              会場情報
            </h3>

            <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2rem' }}>📍</span>
                <h4 className="japanese-text bold" style={{ fontSize: '1.3rem', color: 'var(--color-ice-blue)' }}>
                  場所
                </h4>
              </div>


              <Image
                src="/hero_1.jpg"
                alt="/hero_1.jpg"
                width={800}
                height={400}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)'
                }}
              />


              <p className="japanese-text" style={{ fontSize: '1.1rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                Ishibiki Anarchy<br />
                <span style={{ fontSize: '0.95rem', color: 'var(--color-silver)' }}>
                  石川県金沢市石引２丁目６−１２<br />
                  2-6-12 Ishibiki, Kanazawa City, Ishikawa
                </span>
              </p>

              <a
                href="https://www.google.com/maps/place/石引アナーキー/@36.554767,136.6710047,17z/data=!3m1!4b1!4m6!3m5!1s0x5ff83378032d0a87:0xe3fb028e23cb1cf5!8m2!3d36.554767!4d136.6710047!16s%2Fg%2F11ycpxthny?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '1rem'
                }}
              >
                <span>🗺️</span>
                <span>地図を見る / View Map</span>
              </a>
            </div>

            {/* Access Info */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>🚇</span>
                <h4 className="japanese-text bold" style={{ fontSize: '1.3rem', color: 'var(--color-ice-blue)' }}>
                  アクセス
                </h4>
              </div>
              <p className="japanese-text" style={{ fontSize: '1rem', marginLeft: '3rem', lineHeight: 1.8, color: 'var(--color-silver)' }}>
                金沢駅よりバス一本<br />
                <span style={{ fontSize: '0.9rem' }}>
                  1 bus from Kanazawa Station
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          padding: '3rem 0',
          textAlign: 'center',
          borderTop: '1px solid rgba(91, 192, 190, 0.2)',
          marginTop: '4rem'
        }}>
          <div className="container">
            <div className="float" style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '3rem' }}>🌙</span>
            </div>
            <p className="japanese-text" style={{
              fontSize: '1.2rem',
              marginBottom: '1rem',
              color: 'var(--color-ice-light)'
            }}>
              冬の夜に、心温まるひとときを
            </p>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--color-silver)',
              fontStyle: 'italic',
              marginBottom: '2rem'
            }}>
              A heartwarming moment on a winter night
            </p>
            <div style={{
              height: '2px',
              width: '100px',
              background: 'linear-gradient(90deg, transparent, var(--color-ice-blue), transparent)',
              margin: '2rem auto',
              borderRadius: '2px'
            }} />
            <p style={{ fontSize: '0.85rem', color: 'var(--color-silver)', opacity: 0.7 }}>
              See you soon, Ollie 🇦🇺✨
            </p>
          </div>
        </footer>
      </div>
    </main >
  );
}
