// 最新のAninestライブラリを使用したモダンアニメーション実装
import { 
  createAnimation, 
  modifyTo, 
  updateAnimation, 
  getStateTree,
  getLinearInterp,
  getElasticInterp,
  addLocalListener
} from 'https://cdn.jsdelivr.net/npm/aninest@latest/dist/index.js';

class ModernCardAnimator {
  constructor() {
    this.cards = [];
    this.clickCount = 0;
    this.animationFrameId = null;
    this.lastTime = 0;
    this.init();
  }

  init() {
    this.setupCards();
    this.startAnimationLoop();
    this.setupNavigation();
  }

  setupCards() {
    const cardElements = document.querySelectorAll('.card');
    
    cardElements.forEach((cardElement, index) => {
      // 各カードの初期状態を定義
      const initialState = {
        transform: {
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          translateY: 0,
          translateZ: 0
        },
        background: {
          hue: 0,
          saturation: 0,
          lightness: 95
        },
        border: {
          radius: 12,
          width: 1
        }
      };

      // Aninestアニメーションオブジェクトを作成
      const animation = createAnimation(initialState, getElasticInterp(1.2, 0.8));
      
      // カード情報を保存
      const cardData = {
        element: cardElement,
        animation,
        index,
        isHovered: false,
        isClicked: false
      };

      this.cards.push(cardData);
      this.setupCardEvents(cardData);
      this.setupCardAppearance(cardData);
    });
  }

  setupCardEvents(cardData) {
    const { element, animation, index } = cardData;

    // マウスエンター: エラスティックなホバー効果
    element.addEventListener('mouseenter', () => {
      cardData.isHovered = true;
      modifyTo(animation, {
        transform: {
          scale: 1.05,
          translateY: -12,
          translateZ: 20
        },
        border: {
          radius: 16,
          width: 2
        }
      });
    });

    // マウスリーブ: 元の状態に戻る
    element.addEventListener('mouseleave', () => {
      cardData.isHovered = false;
      if (!cardData.isClicked) {
        modifyTo(animation, {
          transform: {
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            translateY: 0,
            translateZ: 0
          },
          border: {
            radius: 12,
            width: 1
          }
        });
      }
    });

    // マウスムーブ: 3D傾き効果
    element.addEventListener('mousemove', (e) => {
      if (cardData.isHovered) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);

        modifyTo(animation.children.transform, {
          rotateY: deltaX * 15,
          rotateX: -deltaY * 15
        });
      }
    });

    // クリック: カラフルなアニメーション
    element.addEventListener('click', () => {
      this.clickCount++;
      cardData.isClicked = true;

      // ランダムなカラーアニメーション
      const randomHue = Math.floor(Math.random() * 360);
      const pulseAnimation = createAnimation({
        scale: 1.2,
        rotation: Math.random() * 360
      }, getLinearInterp(0.3));

      modifyTo(animation, {
        background: {
          hue: randomHue,
          saturation: 70,
          lightness: 80
        },
        transform: {
          scale: 1.15,
          translateY: -8
        }
      });

      // パルス効果
      setTimeout(() => {
        modifyTo(animation.children.transform, {
          scale: cardData.isHovered ? 1.05 : 1
        });
      }, 200);

      // クリック状態をリセット
      setTimeout(() => {
        cardData.isClicked = false;
      }, 500);

      console.log(`🎨 カード${index + 1}がクリックされました！総クリック数: ${this.clickCount}`);
    });

    // タッチデバイス対応
    element.addEventListener('touchstart', (e) => {
      e.preventDefault();
      element.dispatchEvent(new Event('mouseenter'));
    });

    element.addEventListener('touchend', (e) => {
      e.preventDefault();
      element.dispatchEvent(new Event('click'));
      setTimeout(() => {
        element.dispatchEvent(new Event('mouseleave'));
      }, 1000);
    });
  }

  setupCardAppearance(cardData) {
    const { element, animation } = cardData;
    
    // CSSカスタムプロパティでアニメーション値を適用
    const updateVisuals = () => {
      const state = getStateTree(animation);
      const { transform, background, border } = state;

      element.style.transform = `
        perspective(1000px)
        translateY(${transform.translateY}px)
        translateZ(${transform.translateZ}px)
        scale(${transform.scale})
        rotateX(${transform.rotateX}deg)
        rotateY(${transform.rotateY}deg)
      `;

      element.style.backgroundColor = `hsl(${background.hue}, ${background.saturation}%, ${background.lightness}%)`;
      element.style.borderRadius = `${border.radius}px`;
      element.style.borderWidth = `${border.width}px`;
      element.style.borderColor = `hsl(${background.hue}, ${Math.min(background.saturation + 20, 100)}%, ${Math.max(background.lightness - 20, 20)}%)`;
    };

    // アニメーションの変更をリスニング
    addLocalListener(animation, 'end', updateVisuals);
    addLocalListener(animation, 'start', updateVisuals);
    
    // 初期状態を設定
    updateVisuals();
  }

  startAnimationLoop() {
    const animate = (currentTime) => {
      const deltaTime = this.lastTime ? (currentTime - this.lastTime) / 1000 : 0;
      this.lastTime = currentTime;

      let needsUpdate = false;

      // すべてのカードアニメーションを更新
      this.cards.forEach(cardData => {
        const hasUpdate = updateAnimation(cardData.animation, deltaTime);
        if (hasUpdate) {
          needsUpdate = true;
          this.updateCardVisuals(cardData);
        }
      });

      // アニメーションが続いている間はループを継続
      if (needsUpdate) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.animationFrameId = null;
        this.lastTime = 0;
      }
    };

    // 初回アニメーションループを開始
    this.animationFrameId = requestAnimationFrame(animate);
  }

  updateCardVisuals(cardData) {
    const { element, animation } = cardData;
    const state = getStateTree(animation);
    const { transform, background, border } = state;

    // 最適化されたスタイル更新
    element.style.transform = `
      perspective(1000px)
      translateY(${transform.translateY}px)
      translateZ(${transform.translateZ}px)
      scale(${transform.scale})
      rotateX(${transform.rotateX}deg)
      rotateY(${transform.rotateY}deg)
    `;

    element.style.backgroundColor = `hsl(${background.hue}, ${background.saturation}%, ${background.lightness}%)`;
    element.style.borderRadius = `${border.radius}px`;
    element.style.borderWidth = `${border.width}px`;
    element.style.borderColor = `hsl(${background.hue}, ${Math.min(background.saturation + 20, 100)}%, ${Math.max(background.lightness - 20, 20)}%)`;
  }

  setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link, index) => {
      const navAnimation = createAnimation({
        scale: 1,
        translateY: 0,
        rotation: 0
      }, getElasticInterp(1.5, 0.7));

      link.addEventListener('mouseenter', () => {
        modifyTo(navAnimation, {
          scale: 1.1,
          translateY: -2
        });
      });

      link.addEventListener('mouseleave', () => {
        modifyTo(navAnimation, {
          scale: 1,
          translateY: 0
        });
      });

      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // クリックアニメーション
        modifyTo(navAnimation, {
          scale: 0.95,
          rotation: 360
        });

        setTimeout(() => {
          modifyTo(navAnimation, {
            scale: 1.1,
            rotation: 0
          });
        }, 150);

        // 効果音的なフィードバック
        console.log(`🧭 ナビゲーション "${link.textContent}" がクリックされました！`);
        
        // より洗練されたフィードバック
        this.showNavigationFeedback(link.textContent);
      });

      // ナビゲーションアニメーション更新
      const updateNavVisuals = () => {
        const state = getStateTree(navAnimation);
        link.style.transform = `
          scale(${state.scale})
          translateY(${state.translateY}px)
          rotate(${state.rotation}deg)
        `;
      };

      addLocalListener(navAnimation, 'end', updateNavVisuals);
      addLocalListener(navAnimation, 'start', updateNavVisuals);
    });
  }

  showNavigationFeedback(linkText) {
    // モダンな通知システム
    const notification = document.createElement('div');
    notification.className = 'modern-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">🚀</span>
        <span class="notification-text">${linkText} セクションに移動中...</span>
      </div>
    `;

    document.body.appendChild(notification);

    // 通知のアニメーション
    const notificationAnim = createAnimation({
      opacity: 0,
      translateY: -50,
      scale: 0.8
    }, getElasticInterp(1.2, 0.8));

    const animateNotification = () => {
      const state = getStateTree(notificationAnim);
      notification.style.opacity = state.opacity;
      notification.style.transform = `
        translateY(${state.translateY}px)
        scale(${state.scale})
      `;
    };

    // 表示アニメーション
    modifyTo(notificationAnim, {
      opacity: 1,
      translateY: 0,
      scale: 1
    });

    const notificationLoop = () => {
      const needsUpdate = updateAnimation(notificationAnim, 1/60);
      animateNotification();
      if (needsUpdate) {
        requestAnimationFrame(notificationLoop);
      }
    };
    
    requestAnimationFrame(notificationLoop);

    // 自動削除
    setTimeout(() => {
      modifyTo(notificationAnim, {
        opacity: 0,
        translateY: -30,
        scale: 0.8
      });
      
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 500);
    }, 2000);
  }
}

// ページロード時に初期化
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎭 最新のAninestライブラリでアニメーション開始！');
  new ModernCardAnimator();
});