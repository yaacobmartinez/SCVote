import React, { useState, createContext, useEffect } from "react";
export const BallotContext = createContext();
export const HelpContext = createContext();
export const BallotContextProvider = (props) => {
	const _help = () => localStorage.getItem("help") || true;
	const _selectedCandidates = () =>
		JSON.parse(localStorage.getItem("selectedCandidates")) || null;

	const [selectedCandidates, setSelectedCandidates] = useState(
		_selectedCandidates
	);
	const [help, setHelp] = useState(_help);

	useEffect(() => {
		localStorage.setItem("help", help);
	}, [help]);

	useEffect(() => {
		localStorage.setItem(
			"selectedCandidates",
			JSON.stringify(selectedCandidates)
		);
	}, [selectedCandidates]);
	const logOut = () => localStorage.clear();
	return (
		<BallotContext.Provider
			value={[selectedCandidates, setSelectedCandidates, logOut]}>
			<HelpContext.Provider value={[help, setHelp]}>
				{props.children}
			</HelpContext.Provider>
		</BallotContext.Provider>
	);
};
