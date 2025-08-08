// 商品データ構造に従ったサンプルデータ
const products = [
    {
        id: 'product-001',
        name: 'ワイヤレスイヤホン Pro',
        price: 12800,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
        description: '高音質・ノイズキャンセリング機能付きの最新ワイヤレスイヤホン。長時間バッテリーで快適な音楽体験をお楽しみください。',
        stock: 15
    },
    {
        id: 'product-002',
        name: 'スマートウォッチ X1',
        price: 25600,
        image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=300&fit=crop',
        description: '健康管理からスマートフォン連携まで、多機能を搭載したスマートウォッチ。防水・GPS機能付き。',
        stock: 8
    },
    {
        id: 'product-003',
        name: 'ゲーミングキーボード RGB',
        price: 8900,
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
        description: 'メカニカルスイッチ採用のゲーミングキーボード。美しいRGBライティングとカスタマイズ可能なキーバインド。',
        stock: 25
    },
    {
        id: 'product-004',
        name: 'ポータブル充電器 20000mAh',
        price: 3200,
        image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=300&fit=crop',
        description: '大容量20000mAhのポータブル充電器。急速充電対応で複数デバイスを同時充電可能。',
        stock: 42
    },
    {
        id: 'product-005',
        name: 'Bluetoothスピーカー Pro',
        price: 15400,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
        description: '360度サラウンドサウンドのBluetoothスピーカー。防水設計でアウトドアでも安心してご利用いただけます。',
        stock: 12
    },
    {
        id: 'product-006',
        name: 'デスクライト LED',
        price: 6800,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        description: '目に優しいLEDデスクライト。調光・調色機能付きで作業効率をアップ。USB充電ポート内蔵。',
        stock: 3
    }
];

// カートデータをlocalStorageから取得・保存するクラス
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.updateCartDisplay();
    }

    // localStorageからカートデータを読み込み
    loadCart() {
        try {
            const savedCart = localStorage.getItem('shopeasy-cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('カートデータの読み込みに失敗しました:', error);
            return [];
        }
    }

    // localStorageにカートデータを保存
    saveCart() {
        try {
            localStorage.setItem('shopeasy-cart', JSON.stringify(this.cart));
        } catch (error) {
            console.error('カートデータの保存に失敗しました:', error);
        }
    }

    // 商品をカートに追加
    addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) {
            console.error('商品が見つかりません:', productId);
            return false;
        }

        if (product.stock <= 0) {
            alert('申し訳ございません。この商品は在庫切れです。');
            return false;
        }

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            if (existingItem.quantity >= product.stock) {
                alert('申し訳ございません。在庫数を超えて追加することはできません。');
                return false;
            }
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        this.showAddToCartFeedback(product.name);
        return true;
    }

    // カートから商品を削除
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }

    // 数量を更新
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    // カート表示を更新
    updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');
        
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * 1.1 * item.quantity), 0);
        
        if (cartCount) cartCount.textContent = totalItems;
        if (cartTotal) cartTotal.textContent = Math.round(totalPrice).toLocaleString();
    }

    // カート追加フィードバック表示
    showAddToCartFeedback(productName) {
        // 簡単なフィードバック表示（本来はトーストやスナックバーを使用）
        console.log(`${productName} をカートに追加しました`);
    }

    // カートの合計金額取得
    getTotalPrice() {
        return this.cart.reduce((sum, item) => sum + (item.price * 1.1 * item.quantity), 0);
    }
}

// 商品カードコンポーネントを生成する関数
function createProductCard(product) {
    // 税込み価格を計算（税率10%）
    const priceWithTax = Math.round(product.price * 1.1);
    
    // 在庫状況に応じたバッジとボタンの状態
    let stockStatus = '';
    let buttonDisabled = '';
    let buttonText = 'カートに追加';
    
    if (product.stock === 0) {
        stockStatus = 'product-card__stock--out';
        buttonDisabled = 'disabled';
        buttonText = '在庫切れ';
    } else if (product.stock <= 5) {
        stockStatus = 'product-card__stock--low';
    }

    // 商品カードのHTML構造
    const cardHTML = `
        <article class="product-card" role="article" aria-labelledby="product-${product.id}-name">
            <div class="product-card__image-container">
                <img 
                    src="${product.image}" 
                    alt="${product.name}の商品画像" 
                    class="product-card__image"
                    loading="lazy"
                    onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'"
                >
                ${product.stock <= 5 && product.stock > 0 ? '<span class="product-card__badge">残りわずか</span>' : ''}
                ${product.stock === 0 ? '<span class="product-card__badge" style="background-color: #dc2626;">売り切れ</span>' : ''}
            </div>
            <div class="product-card__content">
                <h3 id="product-${product.id}-name" class="product-card__name">${product.name}</h3>
                <p class="product-card__description">${product.description}</p>
                <div class="product-card__footer">
                    <div class="product-card__price-container">
                        <span class="product-card__price-label">税込価格</span>
                        <span class="product-card__price">¥${priceWithTax.toLocaleString()}</span>
                    </div>
                    <button 
                        class="product-card__add-btn" 
                        onclick="cartManager.addToCart('${product.id}')"
                        ${buttonDisabled}
                        aria-label="${product.name}をカートに追加"
                    >
                        ${buttonText}
                    </button>
                </div>
                <div class="product-card__stock ${stockStatus}">
                    在庫: ${product.stock}個
                </div>
            </div>
        </article>
    `;

    return cardHTML;
}

// 商品一覧を読み込んで表示する関数
async function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');

    try {
        // ローディング表示
        loading.style.display = 'block';
        error.style.display = 'none';
        productsGrid.innerHTML = '';

        // 実際のAPIでは非同期処理をシミュレート
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 商品カードを生成
        const productCards = products.map(product => createProductCard(product));
        
        // DOM に挿入
        productsGrid.innerHTML = productCards.join('');
        
        // ローディング非表示
        loading.style.display = 'none';

    } catch (err) {
        console.error('商品データの読み込みエラー:', err);
        loading.style.display = 'none';
        error.style.display = 'block';
    }
}

// カートモーダルの表示・非表示制御
function setupCartModal() {
    const cartButton = document.querySelector('.header__cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeButton = document.querySelector('.cart-modal__close-btn');
    const overlay = document.querySelector('.cart-modal__overlay');

    // カートボタンクリックでモーダル表示
    cartButton?.addEventListener('click', () => {
        updateCartModal();
        cartModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // スクロール無効化
    });

    // 閉じるボタンやオーバーレイクリックでモーダル非表示
    const closeModal = () => {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // スクロール有効化
    };

    closeButton?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);

    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartModal.style.display === 'block') {
            closeModal();
        }
    });
}

// カートモーダルの内容を更新
function updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    
    if (cartManager.cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">カートは空です</p>';
        return;
    }

    const cartHTML = cartManager.cart.map(item => {
        const priceWithTax = Math.round(item.price * 1.1);
        const totalPrice = priceWithTax * item.quantity;
        
        return `
            <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--border-color);">
                <div>
                    <h4 style="margin-bottom: 0.5rem;">${item.name}</h4>
                    <p style="color: var(--text-secondary); font-size: var(--font-size-sm);">¥${priceWithTax.toLocaleString()} × ${item.quantity}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span style="font-weight: 600;">¥${totalPrice.toLocaleString()}</span>
                    <button onclick="cartManager.removeFromCart('${item.id}')" style="background: #dc2626; color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 4px; cursor: pointer;">削除</button>
                </div>
            </div>
        `;
    }).join('');

    cartItems.innerHTML = cartHTML;
}

// エラーハンドリング付きの初期化関数
function initializeApp() {
    try {
        // カートマネージャーを初期化
        window.cartManager = new CartManager();
        
        // カートモーダルをセットアップ
        setupCartModal();
        
        // 商品を読み込み
        loadProducts();
        
        console.log('ShopEasy アプリケーションが正常に初期化されました');
    } catch (error) {
        console.error('アプリケーションの初期化に失敗しました:', error);
        
        // エラー状態を表示
        const error_div = document.getElementById('error');
        if (error_div) {
            error_div.style.display = 'block';
            error_div.innerHTML = `
                <p>アプリケーションの初期化に失敗しました。</p>
                <button class="error__retry-btn" onclick="location.reload()">ページを再読み込み</button>
            `;
        }
    }
}

// DOMContentLoaded イベントでアプリケーションを初期化
document.addEventListener('DOMContentLoaded', initializeApp);

// ウィンドウエラーのグローバルハンドリング
window.addEventListener('error', (event) => {
    console.error('グローバルエラーが発生しました:', event.error);
});

// 未処理のPromise rejection をキャッチ
window.addEventListener('unhandledrejection', (event) => {
    console.error('未処理のPromise rejectionが発生しました:', event.reason);
    event.preventDefault(); // デフォルトのエラー表示を防止
});