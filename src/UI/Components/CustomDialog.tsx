import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ReactNode } from 'react';

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function CustomDialog({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
}: CustomDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#F5F4FF',
          },
        },
      }}
    >
      {title && (
        <DialogTitle
          sx={{
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            textAlign: 'center',
          }}
        >
          {title}
        </DialogTitle>
      )}
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions sx={{ px: 3, pb: 3 }}>{actions}</DialogActions>}
    </Dialog>
  );
}
