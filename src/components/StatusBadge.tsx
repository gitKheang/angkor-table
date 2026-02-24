import type { BookingStatus } from '@/types';
import { useApp } from '@/context/AppContext';

const statusConfig: Record<BookingStatus, { label: string; labelKh: string; className: string }> = {
  pending: { label: 'Pending', labelKh: 'រង់ចាំ', className: 'status-pending' },
  confirmed: { label: 'Confirmed', labelKh: 'បានបញ្ជាក់', className: 'status-confirmed' },
  rejected: { label: 'Rejected', labelKh: 'បានបដិសេធ', className: 'status-rejected' },
  cancelled: { label: 'Cancelled', labelKh: 'បានលុបចោល', className: 'status-cancelled' },
  noshow: { label: 'No-show', labelKh: 'មិនបានមក', className: 'status-noshow' },
};

const StatusBadge = ({ status }: { status: BookingStatus }) => {
  const { language } = useApp();
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${config.className}`}>
      {language === 'km' ? config.labelKh : config.label}
    </span>
  );
};

export default StatusBadge;
