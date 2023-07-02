const NewMessages = () => {
	return (
		<div className="pl-6 sm:px-10 col-span-5 my-6">
			<h4 className="text-left my-4 text-black">New messages (3)</h4>

			<div className="flex flex-col">
				<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
						<div className="overflow-hidden shadow-md sm:rounded-lg">
							<table className="min-w-full">
								<thead className="bg-gray-50 dark:bg-gray-700">
									<tr>
										<th
											scope="col"
											className="
                                      py-3
                                      px-6
                                      text-xs
                                      font-medium
                                      tracking-wider
                                      text-left text-gray-700
                                      uppercase
                                      dark:text-gray-400
                                  "
										>
											Name
										</th>
										<th
											scope="col"
											className="
                                      py-3
                                      px-6
                                      text-xs
                                      font-medium
                                      tracking-wider
                                      text-left text-gray-700
                                      uppercase
                                      dark:text-gray-400
                                  "
										>
											Message
										</th>
										<th
											scope="col"
											className="
                                      py-3
                                      px-6
                                      text-xs
                                      font-medium
                                      tracking-wider
                                      text-left text-gray-700
                                      uppercase
                                      dark:text-gray-400
                                      text-right
                                  "
										>
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									<tr
										className="
                                  bg-white
                                  border-b
                                  dark:bg-gray-800 dark:border-gray-700
                              "
									>
										<td
											className="
                                      py-4
                                      px-6
                                      text-sm
                                      font-medium
                                      text-gray-900
                                      whitespace-nowrap
                                      dark:text-white
                                      text-left
                                  "
										>
											Kévin
										</td>
										<td
											className="
                                      py-4
                                      px-6
                                      text-sm text-gray-500
                                      whitespace-nowrap
                                      dark:text-gray-400
                                      text-left
                                  "
										>
											Hey Andrew, I would like to book a
											visit for...
										</td>
										<td
											className="
                                      py-4
                                      px-6
                                      text-sm
                                      font-medium
                                      text-right
                                      whitespace-nowrap
                                  "
										>
											<a
												href="/"
												className="
                                          text-blue-600
                                          hover:text-blue-900
                                          dark:text-blue-500
                                          dark:hover:underline
                                      "
											>
												Respond
											</a>
										</td>
									</tr>

									<tr
										className="
                                  bg-white
                                  border-b
                                  dark:bg-gray-800 dark:border-gray-700
                              "
									>
										<td
											className="
                                      py-4
                                      px-6
                                      text-sm
                                      font-medium
                                      text-gray-900
                                      whitespace-nowrap
                                      dark:text-white
                                      text-left
                                  "
										>
											Jon
										</td>
										<td
											className="
                                      py-4
                                      px-6
                                      text-sm text-gray-500
                                      whitespace-nowrap
                                      dark:text-gray-400
                                      text-left
                                  "
										>
											Good morning Andrew, would you be
											available on...
										</td>

										<td
											className="
                                      py-4
                                      px-6
                                      text-sm
                                      font-medium
                                      text-right
                                      whitespace-nowrap
                                  "
										>
											<a
												href="/"
												className="
                                          text-blue-600
                                          hover:text-blue-900
                                          dark:text-blue-500
                                          dark:hover:underline
                                      "
											>
												Respond
											</a>
										</td>
									</tr>

									<tr className="bg-white dark:bg-gray-800">
										<td
											className="
                                      py-4
                                      px-6
                                      text-sm
                                      font-medium
                                      text-gray-900
                                      whitespace-nowrap
                                      dark:text-white
                                      text-left
                                  "
										>
											Bryan
										</td>
										<td
											className="
                                      py-4
                                      px-6
                                      text-sm text-gray-500
                                      whitespace-nowrap
                                      dark:text-gray-400
                                      text-left
                                  "
										>
											Hi Andrew, how are you? Is House
											Andromeda still...
										</td>

										<td
											className="
                                      py-4
                                      px-6
                                      text-sm
                                      font-medium
                                      text-right
                                      whitespace-nowrap
                                  "
										>
											<a
												href="/"
												className="
                                          text-blue-600
                                          hover:text-blue-900
                                          dark:text-blue-500
                                          dark:hover:underline
                                      "
											>
												Respond
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewMessages;
