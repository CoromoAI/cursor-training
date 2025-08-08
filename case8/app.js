// プレミアムHello World - JavaScript実装
'use strict';

/**
 * アプリケーションの状態管理
 */
const AppState = {
    isTyping: false,
    currentLanguageIndex: 0,
    animationId: null,
    particles: []
};

/**
 * 多言語挨拶メッセージ
 */
const greetings = [
    'Welcome to the future',
    'こんにちは、世界！',
    'Hello, World!',
    'Bonjour le monde!',
    '¡Hola Mundo!',
    'Hallo Welt!',
    'Ciao Mondo!',
    '你好，世界！',
    '안녕하세요, 세계!',
    'Привет, мир!',
    'مرحبا بالعالم',
    'Olá Mundo!',
    'नमस्ते दुनिया',
    'Hej världen!',
    'Γεια σου κόσμε!'
];

/**
 * DOM要素の取得
 */
const elements = {
    titleText: document.getElementById('titleText'),
    typingCursor: document.getElementById('typingCursor'),
    subText: document.getElementById('subText'),
    particlesContainer: document.getElementById('particlesContainer'),
    customCursor: document.getElementById('customCursor'),
    backgroundCanvas: document.getElementById('backgroundCanvas'),
    interactionHint: document.getElementById('interactionHint')
};

/**
 * エラーハンドリング機能
 */
const ErrorHandler = {
    log: (message, error = null) => {
        console.error(`[Premium Hello World Error]: ${message}`, error || '');
    },
    
    handleDOMError: (element, fallback) => {
        if (!element) {
            ErrorHandler.log(`DOM要素が見つかりません: ${element}`);
            return fallback || null;
        }
        return element;
    }
};

/**
 * タイピングアニメーション機能
 */
const TypingAnimation = {
    async typeText(element, text, speed = 150) {
        if (!element) {
            ErrorHandler.log('タイピング対象の要素が見つかりません');
            return;
        }

        AppState.isTyping = true;
        element.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            try {
                element.textContent += text[i];
                await this.delay(speed);
            } catch (error) {
                ErrorHandler.log('タイピングアニメーション中にエラーが発生', error);
                break;
            }
        }
        
        AppState.isTyping = false;
        elements.typingCursor.style.display = 'none';
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

/**
 * パーティクルエフェクト機能
 */
const ParticleSystem = {
    createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // ランダムな色を設定
        const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = randomColor;
        particle.style.boxShadow = `0 0 10px ${randomColor}`;
        
        // ランダムな方向と距離を設定
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 200 + 100;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        particle.style.setProperty('--end-x', `${endX - x}px`);
        particle.style.setProperty('--end-y', `${endY - y}px`);
        
        // パーティクル専用のアニメーション
        particle.style.animation = `particleMove 2s ease-out forwards`;
        
        try {
            elements.particlesContainer.appendChild(particle);
            
            // アニメーション終了後に削除
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        } catch (error) {
            ErrorHandler.log('パーティクル作成中にエラーが発生', error);
        }
    },

    createFireworks(x, y, count = 15) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.createParticle(x, y);
            }, i * 50);
        }
    }
};

/**
 * カスタムカーソル機能
 */
const CustomCursor = {
    init() {
        if (!elements.customCursor) {
            ErrorHandler.log('カスタムカーソル要素が見つかりません');
            return;
        }

        document.addEventListener('mousemove', this.updatePosition.bind(this));
        document.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
    },

    updatePosition(e) {
        if (!elements.customCursor) return;
        
        try {
            elements.customCursor.style.left = `${e.clientX - 10}px`;
            elements.customCursor.style.top = `${e.clientY - 10}px`;
        } catch (error) {
            ErrorHandler.log('カーソル位置更新中にエラーが発生', error);
        }
    },

    onMouseDown() {
        if (!elements.customCursor) return;
        elements.customCursor.classList.add('active');
    },

    onMouseUp() {
        if (!elements.customCursor) return;
        elements.customCursor.classList.remove('active');
    }
};

/**
 * 背景キャンバスアニメーション
 */
const BackgroundAnimation = {
    init() {
        if (!elements.backgroundCanvas) {
            ErrorHandler.log('背景キャンバス要素が見つかりません');
            return;
        }

        const canvas = elements.backgroundCanvas;
        const ctx = canvas.getContext('2d');
        
        this.resizeCanvas(canvas);
        this.animate(ctx, canvas);
        
        window.addEventListener('resize', () => this.resizeCanvas(canvas));
    },

    resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    },

    animate(ctx, canvas) {
        const particles = [];
        const particleCount = 50;

        // 背景パーティクルを作成
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        const render = () => {
            try {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                particles.forEach(particle => {
                    // パーティクルの位置を更新
                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    // 画面端で反転
                    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                    // パーティクルを描画
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                    ctx.fill();
                });

                AppState.animationId = requestAnimationFrame(render);
            } catch (error) {
                ErrorHandler.log('背景アニメーション中にエラーが発生', error);
            }
        };

        render();
    }
};

/**
 * 多言語テキストローテーション
 */
const LanguageRotation = {
    startRotation() {
        if (!elements.subText) {
            ErrorHandler.log('サブテキスト要素が見つかりません');
            return;
        }

        setInterval(() => {
            try {
                AppState.currentLanguageIndex = (AppState.currentLanguageIndex + 1) % greetings.length;
                
                elements.subText.style.opacity = '0';
                
                setTimeout(() => {
                    elements.subText.textContent = greetings[AppState.currentLanguageIndex];
                    elements.subText.style.opacity = '1';
                }, 300);
            } catch (error) {
                ErrorHandler.log('言語ローテーション中にエラーが発生', error);
            }
        }, 3000);
    }
};

/**
 * イベントハンドラー
 */
const EventHandlers = {
    init() {
        // クリックイベントでパーティクルエフェクトを発生
        document.addEventListener('click', (e) => {
            try {
                ParticleSystem.createFireworks(e.clientX, e.clientY);
            } catch (error) {
                ErrorHandler.log('クリックイベント処理中にエラーが発生', error);
            }
        });

        // キーボードサポート（アクセシビリティ）
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                try {
                    const centerX = window.innerWidth / 2;
                    const centerY = window.innerHeight / 2;
                    ParticleSystem.createFireworks(centerX, centerY);
                } catch (error) {
                    ErrorHandler.log('キーボードイベント処理中にエラーが発生', error);
                }
            }
        });

        // ウィンドウサイズ変更時の対応
        window.addEventListener('resize', () => {
            try {
                CustomCursor.updatePosition({ 
                    clientX: window.innerWidth / 2, 
                    clientY: window.innerHeight / 2 
                });
            } catch (error) {
                ErrorHandler.log('リサイズイベント処理中にエラーが発生', error);
            }
        });
    }
};

/**
 * アプリケーション初期化
 */
const App = {
    async init() {
        try {
            console.log('🚀 プレミアムHello Worldを初期化中...');

            // DOM要素の存在確認
            Object.keys(elements).forEach(key => {
                elements[key] = ErrorHandler.handleDOMError(elements[key], null);
            });

            // 各機能の初期化
            CustomCursor.init();
            BackgroundAnimation.init();
            EventHandlers.init();

            // メインアニメーションを開始
            await this.startMainAnimation();

            console.log('✨ 初期化完了！');
        } catch (error) {
            ErrorHandler.log('アプリケーション初期化中にエラーが発生', error);
        }
    },

    async startMainAnimation() {
        try {
            // 少し遅延してからタイピングアニメーションを開始
            await TypingAnimation.delay(1000);
            
            if (elements.titleText) {
                await TypingAnimation.typeText(elements.titleText, 'Hello World', 200);
            }

            // 言語ローテーションを開始
            await TypingAnimation.delay(2000);
            LanguageRotation.startRotation();

        } catch (error) {
            ErrorHandler.log('メインアニメーション開始中にエラーが発生', error);
        }
    }
};

/**
 * DOMContentLoaded時にアプリケーションを初期化
 */
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

/**
 * ウィンドウアンロード時のクリーンアップ
 */
window.addEventListener('beforeunload', () => {
    if (AppState.animationId) {
        cancelAnimationFrame(AppState.animationId);
    }
});