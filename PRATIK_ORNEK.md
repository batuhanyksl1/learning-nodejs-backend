# 🎯 Pratik Örnek: Basit Bir Endpoint Nasıl Çalışır?

Bu dosyada, bir HTTP isteğinin backend'de nasıl işlendiğini adım adım göreceğiz.

---

## 📍 Senaryo: Kullanıcı Listesi Getirme

**İstek:** `GET http://localhost:3000/api/users`

---

## 🔄 İstek Akışı (Adım Adım)

### 1️⃣ İstek Gelir → `src/routes.ts`

```typescript
// src/routes.ts
routes.get("/users", userController.getAllUsers);
```

**Ne oluyor?**

- Kullanıcı `/api/users` URL'sine GET isteği gönderir
- Express, bu route'u bulur
- `userController.getAllUsers` fonksiyonunu çalıştırır

**React Native karşılaştırması:**

```javascript
// Navigation'da route tanımı
<Stack.Screen
  name="Users"
  component={UsersScreen} // ← userController.getAllUsers gibi
/>
```

---

### 2️⃣ Controller Çalışır → `user.controller.ts`

```typescript
// user.controller.ts
export class UserController {
  constructor(private readonly userService: UserService) {}

  async getAllUsers(req: Request, res: Response) {
    // req = Gelen istek (kullanıcıdan)
    // res = Gönderilecek cevap (kullanıcıya)

    console.log("1️⃣ Controller'a geldi!");

    const users = await this.userService.getAllUsers();

    console.log("4️⃣ Service'den döndü, cevap gönderiliyor");
    res.json(users);
  }
}
```

**Ne oluyor?**

- `req`: Gelen HTTP isteği (header'lar, query parametreleri vb.)
- `res`: Gönderilecek HTTP cevabı
- Service'i çağırır ve cevabı bekler
- Cevap gelince `res.json()` ile kullanıcıya gönderir

**React Native karşılaştırması:**

```javascript
// Screen component'teki handler
const UsersScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // API çağrısı (Controller gibi)
    fetchUsers().then((data) => {
      setUsers(data); // res.json() gibi
    });
  }, []);
};
```

---

### 3️⃣ Service Çalışır → `user.service.ts`

```typescript
// user.service.ts
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers() {
    console.log("2️⃣ Service'e geldi!");

    // İş mantığı burada olabilir:
    // - Kullanıcı yetkisi var mı?
    // - Filtreleme yap
    // - Cache kontrolü

    const users = await this.userRepository.findAll();

    console.log("3️⃣ Repository'den döndü");
    return users;
  }
}
```

**Ne oluyor?**

- İş mantığını yönetir
- Repository'yi çağırır (veritabanı işlemi için)
- Sonucu Controller'a döner

**React Native karşılaştırması:**

```javascript
// Custom hook veya utility fonksiyonu
const useUsers = () => {
  const fetchUsers = async () => {
    // İş mantığı
    const data = await api.get("/users");
    return data;
  };
  return { fetchUsers };
};
```

---

### 4️⃣ Repository Çalışır → `user.repository.ts`

```typescript
// user.repository.ts
export class UserRepository {
  async findAll() {
    console.log("3️⃣ Repository'ye geldi!");

    // Veritabanından kullanıcıları getir
    // Şimdilik boş array döndürüyoruz
    return [];
  }
}
```

**Ne oluyor?**

- Veritabanı işlemlerini yapar
- Veriyi Service'e döner

**React Native karşılaştırması:**

```javascript
// API call fonksiyonu
const api = {
  get: async (url) => {
    const response = await fetch(`https://api.example.com${url}`);
    return response.json();
  },
};
```

---

## 📊 Tam Akış Şeması

```
Kullanıcı (React Native App)
    ↓
GET /api/users
    ↓
┌─────────────────────────────────┐
│ 1. Route (routes.ts)            │ ← URL'i bulur
│    routes.get("/users", ...)    │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│ 2. Controller (controller.ts)  │ ← İsteği alır, cevabı gönderir
│    getAllUsers(req, res)       │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│ 3. Service (service.ts)         │ ← İş mantığı
│    getAllUsers()                │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│ 4. Repository (repository.ts)   │ ← Veritabanı işlemi
│    findAll()                    │
└─────────────────────────────────┘
    ↓
Veritabanı
    ↓
[Veri geri döner]
    ↓
Repository → Service → Controller → Kullanıcı
```

---

## 💻 Gerçek Kod Örneği

### Route Tanımı

```typescript
// src/modules/user/user.routes.ts
import { Router } from "express";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";

const router = Router();

// Dependency Injection (Bağımlılık Enjeksiyonu)
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Route tanımı
router.get("/users", (req, res) => {
  userController.getAllUsers(req, res);
});

export default router;
```

**Açıklama:**

1. `UserRepository` oluşturulur
2. `UserService` oluşturulur ve `UserRepository` verilir
3. `UserController` oluşturulur ve `UserService` verilir
4. Route tanımlanır ve Controller çağrılır

**React Native karşılaştırması:**

```javascript
// Provider'ları sarmalama
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

<UserServiceProvider value={userService}>
  <App />
</UserServiceProvider>;
```

---

## 🎓 Öğrenme İpuçları

### 1. Console.log Kullan

Her adımda ne olduğunu görmek için:

```typescript
async getAllUsers(req, res) {
  console.log("📍 Controller'a geldi");
  console.log("📥 Request:", req);

  const users = await this.userService.getAllUsers();

  console.log("📤 Response:", users);
  res.json(users);
}
```

### 2. Adım Adım İlerle

1. Önce Route'u tanımla
2. Basit bir cevap döndür (`res.json({ test: "ok" })`)
3. Sonra Controller ekle
4. Sonra Service ekle
5. Sonra Repository ekle

### 3. Hata Yap, Debug Et

```typescript
try {
  const users = await this.userService.getAllUsers();
  res.json(users);
} catch (error) {
  console.error("❌ Hata:", error);
  res.status(500).json({ error: "Bir şeyler yanlış gitti" });
}
```

---

## 🔍 Debugging İpuçları

### Postman/Thunder Client ile Test Et

1. **GET isteği gönder:**

   ```
   GET http://localhost:3000/api/users
   ```

2. **Console'da göreceğin loglar:**

   ```
   1️⃣ Controller'a geldi!
   2️⃣ Service'e geldi!
   3️⃣ Repository'ye geldi!
   3️⃣ Repository'den döndü
   4️⃣ Service'den döndü, cevap gönderiliyor
   ```

3. **Response'u gör:**
   ```json
   []
   ```

---

## ✅ Özet

1. **Route:** URL'i tanımlar
2. **Controller:** İsteği alır, cevabı gönderir
3. **Service:** İş mantığını yönetir
4. **Repository:** Veritabanı işlemlerini yapar

**Her katmanın görevi farklıdır ve bu sayede kod daha organize olur!**

---

## 🚀 Sonraki Adım

Şimdi kendi endpoint'ini oluşturmayı dene:

1. `/api/test` endpoint'i ekle
2. Basit bir mesaj döndür
3. Console.log ekle ve ne olduğunu gör
4. Adım adım karmaşıklaştır

**Unutma:** Her şey küçük adımlarla başlar! 💪
