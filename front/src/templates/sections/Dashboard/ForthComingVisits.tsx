const ForthComingVisits = () => {
	return (
		<div className="flex flex-col px-6 sm:px-10 col-span-3">
			<h4 className="text-left my-4 text-black">Forthcoming visits</h4>

			<section className="antialiased text-gray-600">
				<div className="flex flex-col justify-start items-start h-full">
					<div
						className="
                  w-full
                  mx-auto
                  bg-white
                  shadow-lg
                  rounded-sm
                  border border-gray-200
              "
					>
						<header className="px-5 py-4 border-b border-gray-100">
							<h2 className="font-semibold text-gray-800 text-left">
								Future visitors
							</h2>
						</header>
						<div className="p-3">
							<div className="overflow-x-auto">
								<table className="table-auto w-full">
									<thead
										className="
                                  text-xs
                                  font-semibold
                                  uppercase
                                  text-gray-400
                                  bg-gray-50
                              "
									>
										<tr>
											<th className="p-2 whitespace-nowrap">
												<div className="font-semibold text-left">
													Name
												</div>
											</th>
											<th className="p-2 whitespace-nowrap">
												<div className="font-semibold text-left">
													Email
												</div>
											</th>
											<th className="p-2 whitespace-nowrap">
												<div className="font-semibold text-left">
													Date
												</div>
											</th>
											<th className="p-2 whitespace-nowrap">
												<div
													className="
                                              font-semibold
                                              text-center
                                          "
												>
													Get in touch
												</div>
											</th>
										</tr>
									</thead>
									<tbody className="text-sm divide-y divide-gray-100">
										<tr>
											<td className="p-2 whitespace-nowrap">
												<div className="flex items-center">
													<div
														className="
                                                  w-10
                                                  h-10
                                                  flex-shrink-0
                                                  mr-2
                                                  sm:mr-3
                                              "
													>
														<img
															className="rounded-full"
															src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
															width="40"
															height="40"
															alt="Alex Shatov"
														/>
													</div>
													<div
														className="
                                                  font-medium
                                                  text-gray-800
                                              "
													>
														Alex Shatov
													</div>
												</div>
											</td>
											<td className="p-2 whitespace-nowrap">
												<div className="text-left">
													alexshatov@gmail.com
												</div>
											</td>
											<td className="p-2 whitespace-nowrap">
												<div
													className="
                                              text-left
                                              font-medium
                                              text-green-500
                                          "
												>
													{new Date().toLocaleDateString()}
												</div>
											</td>
											<td className="p-2 whitespace-nowrap">
												<div className="text-sm text-center">
													<button className="btn-sm">
														Contact Alex
													</button>
												</div>
											</td>
										</tr>
										<tr>
											<td className="p-2 whitespace-nowrap">
												<div className="flex items-center">
													<div
														className="
                                                  w-10
                                                  h-10
                                                  flex-shrink-0
                                                  mr-2
                                                  sm:mr-3
                                              "
													>
														<img
															className="rounded-full"
															src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-06.jpg"
															width="40"
															height="40"
															alt="Philip Harbach"
														/>
													</div>
													<div
														className="
                                                  font-medium
                                                  text-gray-800
                                              "
													>
														Philip Harbach
													</div>
												</div>
											</td>
											<td className="p-2 whitespace-nowrap">
												<div className="text-left">
													philip.h@gmail.com
												</div>
											</td>
											<td className="p-2 whitespace-nowrap">
												<div
													className="
                                              text-left
                                              font-medium
                                              text-green-500
                                          "
												>
													{new Date().toLocaleDateString()}
												</div>
											</td>
											<td className="p-2 whitespace-nowrap">
												<div className="text-sm text-center">
													<button className="btn-sm">
														Contact Philip
													</button>
												</div>
											</td>
										</tr>
										<tr>
											<td className="p-2 whitespace-nowrap">
												<div className="flex items-center">
													<div
														className="
                                                  w-10
                                                  h-10
                                                  flex-shrink-0
                                                  mr-2
                                                  sm:mr-3
                                              "
													>
														<img
															className="rounded-full"
															src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-07.jpg"
															width="40"
															height="40"
															alt="Mirko Fisuk"
														/>
													</div>
													<div
														className="
                                                  font-medium
                                                  text-gray-800
                                              "
													>
														Mirko Fisuk
													</div>
												</div>
											</td>
											<td className="p-2 whitespace-nowrap">
												<div className="text-left">
													mirkofisuk@gmail.com
												</div>
											</td>
											<td className="p-2 whitespace-nowrap">
												<div
													className="
                                              text-left
                                              font-medium
                                              text-green-500
                                          "
												>
													{new Date().toLocaleDateString()}
												</div>
											</td>
											<td className="p-2 whitespace-nowrap">
												<div className="text-sm text-center">
													<button className="btn-sm">
														Contact Mirko
													</button>
												</div>
											</td>
										</tr>
										<tr>
											<td className="p-2 whitespace-nowrap">
												<div className="flex items-center">
													<div
														className="
                                                  w-10
                                                  h-10
                                                  flex-shrink-0
                                                  mr-2
                                                  sm:mr-3
                                              "
													>
														<img
															className="rounded-full"
															src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-08.jpg"
															width="40"
															height="40"
															alt="Olga Semklo"
														/>
													</div>
													<div
														className="
                                                  font-medium
                                                  text-gray-800
                                              "
													>
														Olga Semklo
													</div>
												</div>
											</td>
											<td className="p-2 whitespace-nowrap">
												<div className="text-left">
													olga.s@cool.design
												</div>
											</td>
											<td className="p-2 whitespace-nowrap">
												<div
													className="
                                              text-left
                                              font-medium
                                              text-green-500
                                          "
												>
													{new Date().toLocaleDateString()}
												</div>
											</td>
											<td className="p-2 whitespace-nowrap">
												<div className="text-sm text-center">
													<button className="btn-sm">
														Contact Olga
													</button>
												</div>
											</td>
										</tr>
										<tr>
											<td className="p-2 whitespace-nowrap">
												<div className="flex items-center">
													<div
														className="
                                                  w-10
                                                  h-10
                                                  flex-shrink-0
                                                  mr-2
                                                  sm:mr-3
                                              "
													>
														<img
															className="rounded-full"
															src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-09.jpg"
															width="40"
															height="40"
															alt="Burak Long"
														/>
													</div>
													<div
														className="
                                                  font-medium
                                                  text-gray-800
                                              "
													>
														Burak Long
													</div>
												</div>
											</td>
											<td className="p-2 whitespace-nowrap">
												<div className="text-left">
													longburak@gmail.com
												</div>
											</td>
											<td className="p-2 whitespace-nowrap">
												<div
													className="
                                              text-left
                                              font-medium
                                              text-green-500
                                          "
												>
													{new Date().toLocaleDateString()}
												</div>
											</td>
											<td className="p-2 whitespace-nowrap">
												<div className="text-sm text-center">
													<button className="btn-sm">
														Contact Long
													</button>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ForthComingVisits;
