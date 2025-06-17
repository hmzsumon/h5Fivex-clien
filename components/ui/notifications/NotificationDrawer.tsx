'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import {
	useGetNotificationsQuery,
	useUpdateNotificationStatusMutation,
} from '@/redux/features/notifications/notificationApi';
import { Eye } from 'lucide-react';

export function NotificationDrawer({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isOpen, setIsOpen] = useState(false);

	const { data, isLoading, refetch } = useGetNotificationsQuery();
	const { notifications } = data || [];

	const [
		updateNotificationStatus,
		{ isLoading: isUpdatingNotificationStatus },
	] = useUpdateNotificationStatusMutation();

	return (
		<Sheet
			open={isOpen}
			onOpenChange={(open) => {
				setIsOpen(open);
				if (open) {
					refetch(); // ✅ Drawer খুললে auto refetch
				}
			}}
		>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className='bg-gradient-to-br from-cyan-100 via-sky-200 to-indigo-100'>
				<SheetHeader>
					<SheetTitle>Notifications</SheetTitle>
				</SheetHeader>
				<div className='grid flex-1 auto-rows-min gap-6 px-4'>
					{isLoading ? (
						<p className='text-center text-gray-500 py-4'>Loading...</p>
					) : (
						<Accordion
							type='single'
							collapsible
							className='w-full'
							defaultValue='item-1'
						>
							{notifications?.length > 0 ? (
								notifications.map((notification: any) => (
									<AccordionItem
										key={notification._id}
										value={`item-${notification._id}`}
										className='border-b border-gray-200'
									>
										<AccordionTrigger className='flex justify-between items-center py-3'>
											<div className='flex flex-col'>
												<Label className='text-sm font-medium text-gray-800'>
													{notification.title}
												</Label>
											</div>
											<Button
												variant='ghost'
												size='icon'
												onClick={async () => {
													console.log(
														'Notification clicked:',
														notification._id
													);
													try {
														await updateNotificationStatus({
															id: notification._id,
														}).unwrap();
														refetch();
													} catch (err) {
														console.error(
															'❌ Failed to update notification',
															err
														);
													}
												}}
											>
												<Eye size={16} />
											</Button>
										</AccordionTrigger>
										<AccordionContent className='p-4'>
											{notification.message}
										</AccordionContent>
									</AccordionItem>
								))
							) : (
								<div className='text-center py-6 text-gray-500'>
									No notifications available.
								</div>
							)}
						</Accordion>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
