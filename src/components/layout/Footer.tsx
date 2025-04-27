import BugReportIcon from '@mui/icons-material/BugReport';
import EmailIcon from '@mui/icons-material/Email';
import { Footer } from 'nextra-theme-docs';

export default function CustomFooter() {
  return (
    <Footer>
      <div className="flex w-full flex-col justify-between text-sm text-gray-500 sm:flex-row">
        <div>MIT {new Date().getFullYear()} © Nextra.</div>
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="mailto:goni000211@gmail.com"
            className="flex items-center gap-1 hover:underline"
          >
            <EmailIcon fontSize="small" />
            Contact
          </a>
          <a
            href="https://github.com/alexgoni/cocursor-service/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline"
          >
            <BugReportIcon fontSize="small" />
            Report Issue
          </a>
        </div>
      </div>
    </Footer>
  );
}
