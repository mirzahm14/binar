### Chapter 4 - Prisma & Express

#### 1. Setup Database

```sql
CREATE DATABASE bank;
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Copy .env.example to .env and fill in the values

```bash
cp .env.example .env
```

#### 4. Generate the database schema

```bash
npx prisma generate
```

#### 5. Migrate the database

```bash
npx prisma migrate dev
```

#### 6. Run the server

```bash
npm run dev
```