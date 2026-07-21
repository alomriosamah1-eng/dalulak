import { AUTHOR_NAME, AUTHOR_PHONE } from '../../../app/config/constants';

export default function Footer() {
  return (
    <footer className="border-t border-glass bg-nav backdrop-blur-md mt-12 transition-colors duration-300">
      <div className="px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-muted-custom">
        <p>جميع الحقوق محفوظة © دليلك التعليمي والعملي</p>
        <p>{AUTHOR_NAME} - هاتف {AUTHOR_PHONE}</p>
      </div>
    </footer>
  );
}
