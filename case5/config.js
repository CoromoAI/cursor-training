// 税率を定数化する
const TAX_RATE = 0.1;

// 割引率を定数化する
const DISCOUNT_RATE = 0.05;

// 割引数量を定数化する
const DISCOUNT_QUANTITY = 10;

// APIのベースURLを定数化
const API_BASE_URL = 'https://api.example.com';

function calculatePrice(basePrice, quantity) {
  const taxRate = TAX_RATE;
  const discount = quantity > DISCOUNT_QUANTITY ? DISCOUNT_RATE : 0;  // 10個以上で5%割引
  
  const subtotal = basePrice * quantity;
  const discountAmount = subtotal * discount;
  const taxAmount = (subtotal - discountAmount) * taxRate;
  
  return subtotal - discountAmount + taxAmount;
}

// API設定
function getApiConfig() {
  return {
      baseUrl: API_BASE_URL,
      timeout: 5000,
      retryCount: 3
  };
}

// ユーザー情報を取得する関数
function getUserInfo() {
  return {
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30
  };
}