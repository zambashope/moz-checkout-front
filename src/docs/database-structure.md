
# Estrutura do Banco de Dados MongoDB

## Coleções Principais

### 1. Users (Usuários)
```javascript
{
  "_id": ObjectId("..."),
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "hash_da_senha", // bcrypt hash
  "avatar": "url_da_imagem",
  "phone": "+258841234567",
  "createdAt": ISODate("2024-01-15T10:30:00Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00Z"),
  "isActive": true,
  "subscription": {
    "plan": "premium", // free, basic, premium
    "status": "active",
    "expiresAt": ISODate("2024-12-15T10:30:00Z")
  }
}
```

### 2. Products (Produtos)
```javascript
{
  "_id": ObjectId("..."),
  "userId": ObjectId("..."), // Referência ao usuário
  "title": "E-book: Marketing Digital",
  "description": "Aprenda as melhores estratégias de marketing digital...",
  "price": 99.99,
  "currency": "MZN",
  "category": "ebook", // ebook, course, template, software, audio, video, other
  "tags": ["marketing", "digital", "vendas"],
  "coverImage": {
    "url": "https://storage.url/cover.jpg",
    "filename": "cover.jpg",
    "size": 1024000
  },
  "productFile": {
    "url": "https://storage.url/product.pdf",
    "filename": "marketing-digital.pdf",
    "size": 5120000,
    "type": "application/pdf"
  },
  "status": "active", // active, inactive, draft
  "createdAt": ISODate("2024-01-15T10:30:00Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00Z"),
  "stats": {
    "totalSales": 156,
    "totalRevenue": 15444.00,
    "views": 1234
  }
}
```

### 3. Checkouts (Páginas de Checkout)
```javascript
{
  "_id": ObjectId("..."),
  "userId": ObjectId("..."), // Referência ao usuário
  "productId": ObjectId("..."), // Referência ao produto principal
  "title": "Checkout - E-book Marketing Digital",
  "description": "Página de venda para o e-book",
  "customMessage": "Oferta especial por tempo limitado!",
  "url": "marketing-digital-ebook", // slug único
  "settings": {
    "collectPhone": true,
    "collectEmail": true,
    "showTimer": true,
    "timerDuration": 600 // segundos
  },
  "customization": {
    "primaryColor": "#dc2626",
    "buttonColor": "#ef4444",
    "backgroundColor": "#ffffff",
    "textColor": "#000000",
    "borderRadius": "8",
    "fontFamily": "Inter, sans-serif"
  },
  "upsells": [
    {
      "productId": ObjectId("..."),
      "title": "Curso Avançado",
      "description": "Complemento perfeito",
      "price": 199.99,
      "order": 1
    }
  ],
  "downsells": [
    {
      "productId": ObjectId("..."),
      "title": "Versão Básica",
      "description": "Opção mais acessível",
      "price": 49.99,
      "order": 1
    }
  ],
  "status": "active", // active, inactive, draft
  "createdAt": ISODate("2024-01-15T10:30:00Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00Z"),
  "stats": {
    "views": 456,
    "sales": 23,
    "conversionRate": 5.04,
    "revenue": 2277.00
  }
}
```

### 4. Orders (Pedidos)
```javascript
{
  "_id": ObjectId("..."),
  "checkoutId": ObjectId("..."), // Referência ao checkout
  "customerId": ObjectId("..."), // Referência ao cliente (pode ser null para guest)
  "orderNumber": "ORD-2024-001234",
  "customer": {
    "name": "Maria Santos",
    "email": "maria@email.com",
    "phone": "+258841234567"
  },
  "items": [
    {
      "productId": ObjectId("..."),
      "title": "E-book: Marketing Digital",
      "price": 99.99,
      "quantity": 1,
      "type": "main" // main, upsell, downsell
    },
    {
      "productId": ObjectId("..."),
      "title": "Curso Avançado",
      "price": 199.99,
      "quantity": 1,
      "type": "upsell"
    }
  ],
  "totals": {
    "subtotal": 299.98,
    "tax": 0.00,
    "total": 299.98,
    "currency": "MZN"
  },
  "payment": {
    "method": "mpesa", // mpesa, card, bank_transfer
    "status": "completed", // pending, completed, failed, refunded
    "transactionId": "MPesa123456789",
    "paidAt": ISODate("2024-01-20T14:30:00Z")
  },
  "fulfillment": {
    "status": "fulfilled", // pending, fulfilled, failed
    "downloadLinks": [
      {
        "productId": ObjectId("..."),
        "url": "https://secure-download.url/token",
        "expiresAt": ISODate("2024-01-27T14:30:00Z"),
        "downloadCount": 2,
        "maxDownloads": 5
      }
    ],
    "fulfilledAt": ISODate("2024-01-20T14:31:00Z")
  },
  "createdAt": ISODate("2024-01-20T14:30:00Z"),
  "updatedAt": ISODate("2024-01-20T14:31:00Z")
}
```

### 5. Analytics (Eventos de Analytics)
```javascript
{
  "_id": ObjectId("..."),
  "userId": ObjectId("..."), // Dono do checkout
  "checkoutId": ObjectId("..."),
  "sessionId": "sess_1234567890", // Identificador da sessão
  "event": "page_view", // page_view, form_start, form_complete, purchase
  "data": {
    "userAgent": "Mozilla/5.0...",
    "ip": "197.220.10.1",
    "country": "MZ",
    "referrer": "https://google.com",
    "utm_source": "facebook",
    "utm_medium": "cpc",
    "utm_campaign": "ebook-marketing"
  },
  "timestamp": ISODate("2024-01-20T14:30:00Z")
}
```

### 6. Customers (Clientes/Compradores)
```javascript
{
  "_id": ObjectId("..."),
  "name": "Maria Santos",
  "email": "maria@email.com",
  "phone": "+258841234567",
  "purchases": [
    {
      "orderId": ObjectId("..."),
      "productId": ObjectId("..."),
      "title": "E-book: Marketing Digital",
      "amount": 99.99,
      "purchaseDate": ISODate("2024-01-20T14:30:00Z")
    }
  ],
  "totalSpent": 299.98,
  "totalOrders": 2,
  "createdAt": ISODate("2024-01-20T14:30:00Z"),
  "updatedAt": ISODate("2024-01-25T10:15:00Z")
}
```

## Índices Recomendados

```javascript
// Users
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "createdAt": -1 })

// Products
db.products.createIndex({ "userId": 1 })
db.products.createIndex({ "status": 1 })
db.products.createIndex({ "category": 1 })
db.products.createIndex({ "createdAt": -1 })

// Checkouts
db.checkouts.createIndex({ "userId": 1 })
db.checkouts.createIndex({ "url": 1 }, { unique: true })
db.checkouts.createIndex({ "status": 1 })
db.checkouts.createIndex({ "createdAt": -1 })

// Orders
db.orders.createIndex({ "checkoutId": 1 })
db.orders.createIndex({ "customer.email": 1 })
db.orders.createIndex({ "payment.status": 1 })
db.orders.createIndex({ "createdAt": -1 })
db.orders.createIndex({ "orderNumber": 1 }, { unique: true })

// Analytics
db.analytics.createIndex({ "userId": 1, "timestamp": -1 })
db.analytics.createIndex({ "checkoutId": 1, "timestamp": -1 })
db.analytics.createIndex({ "event": 1, "timestamp": -1 })

// Customers
db.customers.createIndex({ "email": 1 }, { unique: true })
db.customers.createIndex({ "createdAt": -1 })
```
