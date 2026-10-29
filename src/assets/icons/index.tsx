import type { LucideIcon } from "lucide-react";
import type { JSX, SVGProps } from "react";

export type BrandIcon = (props: Omit<SVGProps<SVGSVGElement>, "ref">) => JSX.Element;
export type IconComponent = LucideIcon | BrandIcon;

function brand(name: string, width: number, height: number, d: string): BrandIcon {
  const Glyph: BrandIcon = (props) => (
    <svg viewBox={`0 0 ${width} ${height}`} fill="currentColor" {...props}>
      <path d={d} />
    </svg>
  );
  Object.defineProperty(Glyph, "name", { value: name });
  return Glyph;
}

export {
  Accessibility as AccessibilityIcon,
  ArrowDown as ArrowDownIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  BadgeCheck as BadgeCheckIcon,
  Banknote as BanknoteIcon,
  Bell as BellIcon,
  Bot as BotIcon,
  BriefcaseBusiness as BriefcaseIcon,
  CalendarCheck as CalendarCheckIcon,
  Camera as CameraIcon,
  CalendarClock as CalendarClockIcon,
  Building2 as Building2Icon,
  ChartLine as ChartLineIcon,
  Check as CheckIcon,
  ChevronDown as ChevronDownIcon,
  CircleCheck as CircleCheckIcon,
  Download as DownloadIcon,
  Eye as EyeIcon,
  FileLock2 as FileLockIcon,
  ExternalLink as ExternalLinkIcon,
  FileSearch as FileSearchIcon,
  FileText as FileTextIcon,
  FolderKanban as FolderKanbanIcon,
  Hourglass as HourglassIcon,
  Gavel as GavelIcon,
  Globe as GlobeIcon,
  Handshake as HandshakeIcon,
  Headset as HeadsetIcon,
  HeartHandshake as HeartHandshakeIcon,
  House as HouseIcon,
  ImagePlus as ImagePlusIcon,
  Info as InfoIcon,
  Landmark as LandmarkIcon,
  LaptopMinimal as LaptopIcon,
  Lightbulb as LightbulbIcon,
  LockKeyhole as LockIcon,
  Mail as MailIcon,
  MapPin as MapPinIcon,
  Menu as MenuIcon,
  MessageCircle as MessageCircleIcon,
  MessageCircleMore as MessageCircleMoreIcon,
  MessagesSquare as MessagesSquareIcon,
  Newspaper as NewspaperIcon,
  PenLine as PenLineIcon,
  Phone as PhoneIcon,
  Plus as PlusIcon,
  ReceiptText as ReceiptTextIcon,
  RefreshCw as RefreshCwIcon,
  Scale as ScaleIcon,
  ScanFace as ScanFaceIcon,
  Search as SearchIcon,
  Send as SendIcon,
  ShieldCheck as ShieldCheckIcon,
  SlidersHorizontal as SlidersHorizontalIcon,
  Smartphone as SmartphoneIcon,
  Sparkles as SparklesIcon,
  Star as StarIcon,
  Store as StoreIcon,
  Trash2 as TrashIcon,
  TrendingUp as TrendingUpIcon,
  TriangleAlert as TriangleAlertIcon,
  UserCheck as UserCheckIcon,
  User as UserIcon,
  UserRoundCheck as UserRoundCheckIcon,
  Users as UsersIcon,
  Video as VideoIcon,
  Wallet as WalletIcon,
  X as XIcon,
  Zap as ZapIcon,
} from "lucide-react";

export const DotIcon = brand("Dot", 24, 24, "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z");
export const AppleIcon = brand("Apple", 384, 512, "M319.1 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7-55.8 .9-115.1 44.5-115.1 133.2 0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM262.5 104.5c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z");
export const FacebookIcon = brand("Facebook", 512, 512, "M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5l0-170.3-52.8 0 0-78.2 52.8 0 0-33.7c0-87.1 39.4-127.5 125-127.5 16.2 0 44.2 3.2 55.7 6.4l0 70.8c-6-.6-16.5-1-29.6-1-42 0-58.2 15.9-58.2 57.2l0 27.8 83.6 0-14.4 78.2-69.3 0 0 175.9C413.8 494.8 512 386.9 512 256z");
export const GooglePlayIcon = brand("GooglePlay", 448, 512, "M293.6 234.3L72.9 13 353.7 174.2 293.6 234.3zM15.3 0C2.3 6.8-6.4 19.2-6.4 35.3l0 441.3c0 16.1 8.7 28.5 21.7 35.3L271.9 255.9 15.3 0zM440.5 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM72.9 499L353.7 337.8 293.6 277.7 72.9 499z");
export const InstagramIcon = brand("Instagram", 448, 512, "M224.3 141a115 115 0 1 0 -.6 230 115 115 0 1 0 .6-230zm-.6 40.4a74.6 74.6 0 1 1 .6 149.2 74.6 74.6 0 1 1 -.6-149.2zm93.4-45.1a26.8 26.8 0 1 1 53.6 0 26.8 26.8 0 1 1 -53.6 0zm129.7 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM399 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z");
export const LinkedinIcon = brand("Linkedin", 448, 512, "M416 32L31.9 32C14.3 32 0 46.5 0 64.3L0 447.7C0 465.5 14.3 480 31.9 480L416 480c17.6 0 32-14.5 32-32.3l0-383.4C448 46.5 433.6 32 416 32zM135.4 416l-66.4 0 0-213.8 66.5 0 0 213.8-.1 0zM102.2 96a38.5 38.5 0 1 1 0 77 38.5 38.5 0 1 1 0-77zM384.3 416l-66.4 0 0-104c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9l0 105.8-66.4 0 0-213.8 63.7 0 0 29.2 .9 0c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9l0 117.2z");
export const XTwitterIcon = brand("XTwitter", 448, 512, "M357.2 48L427.8 48 273.6 224.2 455 464 313 464 201.7 318.6 74.5 464 3.8 464 168.7 275.5-5.2 48 140.4 48 240.9 180.9 357.2 48zM332.4 421.8l39.1 0-252.4-333.8-42 0 255.3 333.8z");
