import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CorridaModule } from './modules/corrida/corrida.module';
import { AvaliacaoModule } from './modules/avaliacao/avaliacao.module';
import { HistCaronasModule } from './modules/histCarona/hist.module';
import { VeiculoModule } from './modules/veiculo/veiculo.module';
import { VerificacaoModule } from './modules/verificacaoEmail/verificacao.module';
@Module({
  imports: [
    UserModule,
    CorridaModule,
    AvaliacaoModule,
    HistCaronasModule,
    VeiculoModule,
    VerificacaoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
