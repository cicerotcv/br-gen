import SvgLogo from '@/assets/logo.svg';
import { useTranslation } from '@/hooks/translation';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="">
      <div className="flex items-center gap-2">
        <img src={SvgLogo} className="size-12" alt="React logo" />
        <div className="flex flex-col">
          <span className="font-semibold">{t('header_title')}</span>
          <span className="text-muted-foreground text-sm">
            {t('header_subtitle')}
          </span>
        </div>
      </div>
    </header>
  );
};
