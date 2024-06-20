-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "confirmarSenha" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "flagMotorista" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corrida" (
    "IdCorrida" SERIAL NOT NULL,
    "IdUserCorrida" INTEGER NOT NULL,
    "latitudeUserOrigem" TEXT NOT NULL,
    "longitudeUserOrigem" TEXT NOT NULL,
    "latitudeUserDestino" TEXT NOT NULL,
    "longitudeUserDestino" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "hr_saida" TEXT NOT NULL,
    "hr_chegada" TEXT NOT NULL,
    "ST_corrida" TEXT NOT NULL,
    "idUserMotorista" INTEGER,

    CONSTRAINT "corrida_pkey" PRIMARY KEY ("IdCorrida")
);

-- CreateTable
CREATE TABLE "avaliacao" (
    "id" SERIAL NOT NULL,
    "autorUserId" INTEGER NOT NULL,
    "corridaId" INTEGER NOT NULL,
    "ST_avaliacao" DOUBLE PRECISION NOT NULL,
    "comentario_avaliacao" TEXT NOT NULL,
    "status_avaliacao" TEXT NOT NULL,

    CONSTRAINT "avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hist_caronas" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "caronasPegas" INTEGER NOT NULL,
    "caronasFornecidas" INTEGER NOT NULL,

    CONSTRAINT "hist_caronas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "veiculo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "nomeDoVeiculo" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "DescVeiculo" TEXT NOT NULL,

    CONSTRAINT "veiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vericacao" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "email_verificado" BOOLEAN NOT NULL DEFAULT false,
    "token_verificacao" TEXT NOT NULL,

    CONSTRAINT "vericacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_telefone_key" ON "users"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_CPF_key" ON "users"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "veiculo_placa_key" ON "veiculo"("placa");

-- AddForeignKey
ALTER TABLE "corrida" ADD CONSTRAINT "corrida_IdUserCorrida_fkey" FOREIGN KEY ("IdUserCorrida") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "corrida" ADD CONSTRAINT "corrida_idUserMotorista_fkey" FOREIGN KEY ("idUserMotorista") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacao" ADD CONSTRAINT "avaliacao_autorUserId_fkey" FOREIGN KEY ("autorUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacao" ADD CONSTRAINT "avaliacao_corridaId_fkey" FOREIGN KEY ("corridaId") REFERENCES "corrida"("IdCorrida") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hist_caronas" ADD CONSTRAINT "hist_caronas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "veiculo" ADD CONSTRAINT "veiculo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vericacao" ADD CONSTRAINT "vericacao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
