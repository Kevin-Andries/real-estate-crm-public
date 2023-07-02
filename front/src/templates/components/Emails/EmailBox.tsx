import { useEffect, useState } from "react";

// Data
import emailsData from "../../../data/mockEmailData";

// Styles
import "./EmailBox.css";

const EmailBox = () => {
	const [mockEmailsData, setMockEmailsData] = useState<any>([]);
	const [showMarkAsUnreadIcon, setShowMarkAsUnreadIcon] =
		useState<any>(false);
	const [showIcons, setShowIcons] = useState<any>(false);
	const [showDeleteConversationModal, setShowDeleteConversationModal] =
		useState<any>(false);
	const [selectedConversations, setSelectedConversations] = useState<any>([]);

	const checkedConversation = (e: any) => {
		let icons = e.target.checked;
		let markAsUnread = e.target.dataset.read;

		if (markAsUnread === "true") {
			markAsUnread = true;
		} else {
			markAsUnread = false;
		}

		updateSelectedConversationsArray(e.target.dataset.id, icons);

		setShowMarkAsUnreadIcon(markAsUnread);
		setShowIcons(icons);
	};

	const toggleDeleteConversationModal = () => {
		setShowDeleteConversationModal(!showDeleteConversationModal);
	};

	const updateSelectedConversationsArray = (index: number, checked: any) => {
		// Adding / removing indexes
		if (checked) {
			selectedConversations.push(index);
		} else {
			selectedConversations.splice(index, 1);
		}
	};

	const deleteConversations = () => {
		// 1) First send request to the backend

		// 2) If the response is positive, update the front in real time
		selectedConversations.forEach((value: any) => {
			mockEmailsData.forEach((conversation: any, index: number) => {
				if (+index === +value) {
					mockEmailsData.splice(index, 1);
				}
			});
		});

		// 3) Uncheck checkboxes
		uncheckCheckboxes();

		// 4) Toggling off the modal
		toggleDeleteConversationModal();
	};

	const markConversationAsRead = () => {
		// 1) Send request to the backend

		// 2) In case of positive response, update the frontend
		selectedConversations.forEach((value: any) => {
			mockEmailsData.forEach((conversation: any, index: number) => {
				if (+index === +value) {
					conversation.read = false;
				}
			});
		});

		// 2) Uncheck checkboxes
		uncheckCheckboxes();
	};

	const uncheckCheckboxes = () => {
		document
			.querySelectorAll('input[type="checkbox"]')
			.forEach((checkbox: any) => {
				checkbox.checked = false;
			});
	};

	useEffect(() => {
		setMockEmailsData(emailsData);
	}, []);

	return (
		<div className="flex flex-col px-6 sm:px-10 w-full">
			<div className="flex items-center justify-between">
				<h1 className="text-xl text-left my-4">Chats</h1>
				{showIcons && (
					<div className="flex items-center">
						{showMarkAsUnreadIcon && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
								data-tooltip-target="tooltip-default"
								onClick={markConversationAsRead}
							>
								<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
								<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
							</svg>
						)}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 mx-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							onClick={toggleDeleteConversationModal}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
					</div>
				)}
			</div>
			<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
					<div className="overflow-hidden shadow-md sm:rounded-lg">
						<table className="min-w-full border">
							<tbody>
								{mockEmailsData.map(
									(email: any, index: number) => {
										return (
											<tr
												className={`
                                bg-white
                                border-b
                                dark:bg-gray-800 dark:border-gray-700
                                email
                                ${email.read ? "bg-gray-100" : ""}
                            `}
											>
												<td className="w-1/12">
													<div className="flex items-center justify-center">
														<input
															onClick={
																checkedConversation
															}
															type="checkbox"
															className="mr-3"
															data-read={
																email.read
															}
															data-id="index"
														/>
													</div>
												</td>

												<td
													className="
                                    w-1/12
                                    py-4
                                    px-0
                                    text-sm text-left
                                    font-medium
                                    text-gray-900
                                    whitespace-nowrap
                                    dark:text-white
                                "
												>
													{email.senderName}
												</td>

												<td
													className="
                                    w-7/12
                                    truncate
                                    py-4
                                    px-0
                                    text-sm text-left text-gray-500
                                    whitespace-nowrap
                                    dark:text-gray-400
                                "
												>
													{email.emailContent}
												</td>
												<td
													className="
                                    w-1/12
                                    py-4
                                    px-6
                                    text-sm
                                    font-medium
                                    text-right
                                    whitespace-nowrap
                                "
												>
													{email.date}
												</td>
											</tr>
										);
									}
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{showDeleteConversationModal && (
				<div
					className="
            w-full
            h-full
            bg-grey-50
            z-50
            flex
            justify-center
            items-center
        "
					id="delete-conversation-modal"
				>
					<div
						aria-hidden="true"
						className="overflow-y-auto overflow-x-hidden top-4 z-40 md:inset-0"
					>
						<div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
							{/* <!-- Modal content --> */}
							<div
								className="
                        relative
                        bg-white
                        rounded-lg
                        shadow
                        dark:bg-gray-700
                    "
							>
								{/* <!-- Modal header --> */}
								<div
									className="
                            flex
                            justify-center
                            items-start
                            p-5
                            rounded-t
                            border-b
                            dark:border-gray-600
                        "
								>
									<h3
										className="
                                text-xl
                                font-semibold
                                text-gray-900
                                lg:text-2xl
                                dark:text-white
                            "
									>
										You are about to delete
										{selectedConversations.length > 1
											? "these conversations"
											: "this conversation"}
									</h3>
								</div>
								{/* <!-- Modal body --> */}
								<div className="p-6 space-y-2">
									<p
										className="
                                text-base
                                leading-relaxed
                                text-gray-500
                                dark:text-gray-400
                            "
									>
										Once the conversation is deleted, we
										cannot restore it.
									</p>
									<p
										className="
                                text-base
                                leading-relaxed
                                text-gray-500
                                dark:text-gray-400
                            "
									>
										Do you want to proceed?
									</p>
								</div>
								{/* <!-- Modal footer --> */}
								<div
									className="
                            flex
                            items-center
                            justify-center
                            p-6
                            space-x-2
                            rounded-b
                            border-t border-gray-200
                            dark:border-gray-600
                        "
								>
									<button
										data-modal-toggle="default-modal"
										type="button"
										className="
                                text-white
                                bg-red-700
                                hover:bg-red-800
                                focus:ring-4 focus:ring-blue-300
                                font-medium
                                rounded-lg
                                text-sm
                                px-5
                                py-2.5
                                text-center
                                dark:bg-blue-600
                                dark:hover:bg-blue-700
                                dark:focus:ring-blue-800
                            "
										onClick={deleteConversations}
									>
										Yes, delete it
									</button>
									<button
										data-modal-toggle="default-modal"
										type="button"
										className="
                                text-gray-500
                                bg-white
                                hover:bg-gray-100
                                focus:ring-4 focus:ring-gray-300
                                rounded-lg
                                border border-gray-200
                                text-sm
                                font-medium
                                px-5
                                py-2.5
                                hover:text-gray-900
                                focus:z-10
                                dark:bg-gray-700
                                dark:text-gray-300
                                dark:border-gray-500
                                dark:hover:text-white
                                dark:hover:bg-gray-600
                            "
										onClick={toggleDeleteConversationModal}
									>
										No, close modal
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default EmailBox;
