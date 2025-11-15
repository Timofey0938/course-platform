// app/admin/courses/components/EmptyState/EmptyState.tsx
import { BookOpen, Plus } from 'lucide-react';
import Link from 'next/link';
import { EMPTY_STATE_MESSAGES, BUTTON_TEXTS, ROUTES } from '@/lib/constants';
import { Card, Button } from '@/components/ui';
import styles from './EmptyState.module.scss';

interface EmptyStateProps {
    onAddCourse?: () => void;
}

export function EmptyState({ onAddCourse }: EmptyStateProps) {
    return (
        <Card variant="outlined" padding="lg" className={styles.emptyState}>
            <BookOpen className={styles.emptyIcon} />
            <h3>{EMPTY_STATE_MESSAGES.NO_COURSES.TITLE}</h3>
            <p>{EMPTY_STATE_MESSAGES.NO_COURSES.DESCRIPTION}</p>
            <Link href={ROUTES.ADMIN_COURSES_NEW}>
                <Button variant="primary" icon={Plus}>
                    {EMPTY_STATE_MESSAGES.NO_COURSES.ACTION}
                </Button>
            </Link>
        </Card>
    );
}
