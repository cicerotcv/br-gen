import { Separator } from '$/components/ui/separator';

import { GeneratorComponent } from './components/generator';
import { Header } from './components/layout/header.comp';
import { ConfigAutoCopyCheckbox } from './components/settings/auto-copy-checkbox.comp';
import { ClearAllButton } from './components/settings/clear-all-button.comp';
import { ConfigMaskedCheckbox } from './components/settings/masked-checkbox.comp';
import { StorageKeys } from './config/keys';
import { useTranslation } from './hooks/translation';
import { GenUtils } from './modules/generators';

function App() {
  const { t } = useTranslation();

  return (
    <main
      className="bg-background text-foreground flex min-w-[350px] flex-col gap-4
        p-2"
    >
      <Header />

      <Separator />

      <div className="flex flex-row items-start justify-between gap-4">
        <div className="flex flex-col justify-center gap-1 self-center">
          <ConfigMaskedCheckbox />
          <ConfigAutoCopyCheckbox />
        </div>

        <ClearAllButton />
      </div>

      <div className="flex flex-col items-start gap-1">
        <GeneratorComponent
          label={t('label_cpf')}
          generator={GenUtils.cpf}
          pattern="###.###.###-##"
          storeKey={StorageKeys.HistoryCpf}
        />

        <GeneratorComponent
          label={t('label_cnpj')}
          generator={GenUtils.cnpj}
          pattern="##.###.###/####-##"
          storeKey={StorageKeys.HistoryCnpj}
        />

        <GeneratorComponent
          label={t('label_uuid')}
          generator={GenUtils.uuid}
          storeKey={StorageKeys.HistoryUuid}
        />

        <GeneratorComponent
          label={t('label_email')}
          generator={GenUtils.email.random}
          storeKey={StorageKeys.HistoryEmail}
        />

        <GeneratorComponent
          label={t('label_phone')}
          generator={GenUtils.phone.withDdd}
          storeKey={StorageKeys.HistoryPhone}
          pattern="(##) ####-####"
        />

        <GeneratorComponent
          label={t('label_cellphone')}
          generator={GenUtils.cellphone.withDdd}
          pattern="(##) #####-####"
          storeKey={StorageKeys.HistoryCellphone}
        />
      </div>
    </main>
  );
}

export default App;
