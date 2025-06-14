
# Documentação das APIs

## Autenticação

### POST /api/auth/register
**Descrição:** Registrar novo usuário
**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "João Silva",
      "email": "joao@email.com"
    },
    "token": "jwt_token"
  }
}
```

### POST /api/auth/login
**Descrição:** Login do usuário
**Body:**
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "João Silva",
      "email": "joao@email.com"
    },
    "token": "jwt_token"
  }
}
```

## Produtos

### GET /api/products
**Descrição:** Listar produtos do usuário
**Headers:** `Authorization: Bearer jwt_token`
**Query Params:**
- `page`: número da página (padrão: 1)
- `limit`: itens por página (padrão: 10)
- `category`: filtro por categoria
- `status`: filtro por status

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "product_id",
        "title": "E-book: Marketing Digital",
        "description": "Descrição do produto...",
        "price": 99.99,
        "currency": "MZN",
        "category": "ebook",
        "coverImage": "https://storage.url/cover.jpg",
        "status": "active",
        "createdAt": "2024-01-15T10:30:00Z",
        "stats": {
          "totalSales": 156,
          "totalRevenue": 15444.00,
          "views": 1234
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

### POST /api/products
**Descrição:** Criar novo produto
**Headers:** `Authorization: Bearer jwt_token`
**Body (multipart/form-data):**
```
title: "E-book: Marketing Digital"
description: "Aprenda as melhores estratégias..."
price: 99.99
category: "ebook"
tags: "marketing,digital,vendas"
coverImage: [file]
productFile: [file]
```
**Response:**
```json
{
  "success": true,
  "data": {
    "product": {
      "id": "product_id",
      "title": "E-book: Marketing Digital",
      "description": "Aprenda as melhores estratégias...",
      "price": 99.99,
      "currency": "MZN",
      "category": "ebook",
      "tags": ["marketing", "digital", "vendas"],
      "coverImage": {
        "url": "https://storage.url/cover.jpg",
        "filename": "cover.jpg"
      },
      "productFile": {
        "url": "https://storage.url/product.pdf",
        "filename": "marketing-digital.pdf"
      },
      "status": "active",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### GET /api/products/:id
**Descrição:** Obter produto específico
**Headers:** `Authorization: Bearer jwt_token`
**Response:** (mesmo formato do POST)

### PUT /api/products/:id
**Descrição:** Atualizar produto
**Headers:** `Authorization: Bearer jwt_token`
**Body:** (mesmo formato do POST, campos opcionais)

### DELETE /api/products/:id
**Descrição:** Deletar produto
**Headers:** `Authorization: Bearer jwt_token`
**Response:**
```json
{
  "success": true,
  "message": "Produto deletado com sucesso"
}
```

## Checkouts

### GET /api/checkouts
**Descrição:** Listar checkouts do usuário
**Headers:** `Authorization: Bearer jwt_token`
**Query Params:**
- `page`: número da página
- `limit`: itens por página
- `status`: filtro por status

**Response:**
```json
{
  "success": true,
  "data": {
    "checkouts": [
      {
        "id": "checkout_id",
        "productId": "product_id",
        "title": "Checkout - E-book Marketing Digital",
        "description": "Página de venda para o e-book",
        "url": "marketing-digital-ebook",
        "customMessage": "Oferta especial!",
        "settings": {
          "collectPhone": true,
          "collectEmail": true,
          "showTimer": true
        },
        "customization": {
          "primaryColor": "#dc2626",
          "buttonColor": "#ef4444"
        },
        "upsells": [],
        "downs0ells": [],
        "status": "active",
        "createdAt": "2024-01-15T10:30:00Z",
        "stats": {
          "views": 456,
          "sales": 23,
          "conversionRate": 5.04,
          "revenue": 2277.00
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "pages": 1
    }
  }
}
```

### POST /api/checkouts
**Descrição:** Criar novo checkout
**Headers:** `Authorization: Bearer jwt_token`
**Body:**
```json
{
  "productId": "product_id",
  "title": "Checkout - E-book Marketing Digital",
  "description": "Página de venda para o e-book",
  "customMessage": "Oferta especial por tempo limitado!",
  "settings": {
    "collectPhone": true,
    "collectEmail": true,
    "showTimer": true,
    "timerDuration": 600
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
      "productId": "upsell_product_id",
      "order": 1
    }
  ],
  "downsells": [
    {
      "productId": "downsell_product_id",
      "order": 1
    }
  ]
}
```

### GET /api/checkouts/:id
**Descrição:** Obter checkout específico
**Headers:** `Authorization: Bearer jwt_token`

### PUT /api/checkouts/:id
**Descrição:** Atualizar checkout
**Headers:** `Authorization: Bearer jwt_token`
**Body:** (mesmo formato do POST, campos opcionais)

### DELETE /api/checkouts/:id
**Descrição:** Deletar checkout
**Headers:** `Authorization: Bearer jwt_token`

## Checkout Público (para compradores)

### GET /api/public/checkout/:url
**Descrição:** Obter dados do checkout para exibição pública
**Response:**
```json
{
  "success": true,
  "data": {
    "checkout": {
      "id": "checkout_id",
      "title": "Checkout - E-book Marketing Digital",
      "description": "Página de venda para o e-book",
      "customMessage": "Oferta especial!",
      "product": {
        "id": "product_id",
        "title": "E-book: Marketing Digital",
        "description": "Aprenda as melhores estratégias...",
        "price": 99.99,
        "coverImage": "https://storage.url/cover.jpg"
      },
      "upsells": [
        {
          "id": "upsell_id",
          "title": "Curso Avançado",
          "description": "Complemento perfeito",
          "price": 199.99
        }
      ],
      "downsells": [
        {
          "id": "downsell_id",
          "title": "Versão Básica",
          "description": "Opção mais acessível",
          "price": 49.99
        }
      ],
      "settings": {
        "collectPhone": true,
        "collectEmail": true,
        "showTimer": true,
        "timerDuration": 600
      },
      "customization": {
        "primaryColor": "#dc2626",
        "buttonColor": "#ef4444",
        "backgroundColor": "#ffffff",
        "textColor": "#000000",
        "borderRadius": "8",
        "fontFamily": "Inter, sans-serif"
      }
    }
  }
}
```

### POST /api/public/checkout/:url/track
**Descrição:** Registrar evento de analytics
**Body:**
```json
{
  "event": "page_view",
  "sessionId": "sess_1234567890",
  "data": {
    "userAgent": "Mozilla/5.0...",
    "referrer": "https://google.com",
    "utm_source": "facebook",
    "utm_medium": "cpc",
    "utm_campaign": "ebook-marketing"
  }
}
```

## Pedidos

### POST /api/orders
**Descrição:** Criar novo pedido
**Body:**
```json
{
  "checkoutId": "checkout_id",
  "customer": {
    "name": "Maria Santos",
    "email": "maria@email.com",
    "phone": "+258841234567"
  },
  "items": [
    {
      "productId": "product_id",
      "type": "main"
    },
    {
      "productId": "upsell_product_id",
      "type": "upsell"
    }
  ],
  "paymentMethod": "mpesa"
}
```
**Response:**
```json
{
  "success": true,
  "data": {
    "order": {
      "id": "order_id",
      "orderNumber": "ORD-2024-001234",
      "customer": {
        "name": "Maria Santos",
        "email": "maria@email.com",
        "phone": "+258841234567"
      },
      "items": [
        {
          "productId": "product_id",
          "title": "E-book: Marketing Digital",
          "price": 99.99,
          "quantity": 1,
          "type": "main"
        }
      ],
      "totals": {
        "subtotal": 99.99,
        "tax": 0.00,
        "total": 99.99,
        "currency": "MZN"
      },
      "payment": {
        "method": "mpesa",
        "status": "pending"
      },
      "createdAt": "2024-01-20T14:30:00Z"
    },
    "paymentUrl": "https://payment-gateway.url/pay/order_id" // Para redirecionamento
  }
}
```

### GET /api/orders
**Descrição:** Listar pedidos do usuário
**Headers:** `Authorization: Bearer jwt_token`
**Query Params:**
- `page`: número da página
- `limit`: itens por página
- `status`: filtro por status de pagamento
- `checkoutId`: filtro por checkout

### GET /api/orders/:id
**Descrição:** Obter pedido específico
**Headers:** `Authorization: Bearer jwt_token`

### POST /api/orders/:id/fulfill
**Descrição:** Processar entrega do produto (após pagamento aprovado)
**Headers:** `Authorization: Bearer jwt_token`
**Response:**
```json
{
  "success": true,
  "data": {
    "downloadLinks": [
      {
        "productId": "product_id",
        "url": "https://secure-download.url/token",
        "expiresAt": "2024-01-27T14:30:00Z",
        "maxDownloads": 5
      }
    ]
  }
}
```

## Analytics

### GET /api/analytics/overview
**Descrição:** Dados gerais de analytics
**Headers:** `Authorization: Bearer jwt_token`
**Query Params:**
- `period`: 24h, 7d, 30d, 90d (padrão: 7d)
- `checkoutId`: filtro por checkout específico

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalViews": 1234,
      "totalSales": 156,
      "conversionRate": 12.6,
      "revenue": 45600,
      "avgOrderValue": 292.31
    },
    "checkouts": [
      {
        "checkoutId": "checkout_id",
        "checkoutName": "E-book Marketing Digital",
        "views": 456,
        "sales": 23,
        "conversionRate": 5.04,
        "revenue": 2277
      }
    ],
    "funnel": {
      "visitors": 1234,
      "checkoutStarted": 456,
      "formCompleted": 234,
      "purchased": 156
    }
  }
}
```

### GET /api/analytics/transactions
**Descrição:** Listar transações recentes
**Headers:** `Authorization: Bearer jwt_token`
**Query Params:**
- `page`: número da página
- `limit`: itens por página
- `status`: filtro por status

**Response:**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "order_id",
        "orderNumber": "ORD-2024-001234",
        "customer": {
          "name": "Maria Santos",
          "email": "maria@email.com"
        },
        "product": "E-book: Marketing Digital",
        "amount": 99.99,
        "status": "completed",
        "createdAt": "2024-01-20T14:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 156,
      "pages": 8
    }
  }
}
```

## Upload de Arquivos

### POST /api/upload
**Descrição:** Upload de arquivos (imagens, produtos)
**Headers:** `Authorization: Bearer jwt_token`
**Body (multipart/form-data):**
```
file: [file]
type: "cover" | "product" // tipo do arquivo
```
**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://storage.url/filename.ext",
    "filename": "filename.ext",
    "size": 1024000,
    "type": "image/jpeg"
  }
}
```

## Webhooks de Pagamento

### POST /api/webhooks/payment
**Descrição:** Webhook para notificações de pagamento (M-Pesa, etc.)
**Body:** (formato específico do provedor de pagamento)
**Response:**
```json
{
  "success": true,
  "message": "Webhook processado"
}
```

## Códigos de Erro Comuns

- `400`: Bad Request - Dados inválidos
- `401`: Unauthorized - Token inválido ou ausente
- `403`: Forbidden - Sem permissão para acessar o recurso
- `404`: Not Found - Recurso não encontrado
- `409`: Conflict - Conflito (ex: email já existe)
- `422`: Unprocessable Entity - Dados não processáveis
- `500`: Internal Server Error - Erro interno do servidor

## Formato de Resposta de Erro

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados inválidos",
    "details": {
      "email": ["Email é obrigatório"],
      "password": ["Senha deve ter pelo menos 6 caracteres"]
    }
  }
}
```
