interface User {
	id: number;
	name: string;
	password: number;
	email: string;
	role?: string;
}

interface Source {
	id: number;
	name: string;
	isDebit: boolean;
	userId: number;
}

interface Account {
	code: string;
	typeId: string;
	initialBal?: number;
}

interface Reference {
	id: string | null;
	date: string;
	dateOffset: number;
	memo: string;
	amount: number;
	srcId: string | null;
	fitid?: string;
}

interface ReferenceInput {
	date: string;
	dateOffset: number;
	memo: string;
	amount: number;
	fitid?: string;
}

interface ReferenceData {
	ref_id: string;
	ref_date: string;
	ref_date_offset: number;
	ref_memo: string;
	ref_amount: number;
	src_id: string;
	ref_fitid: string;
}

interface Entry {
	id: string;
	type: string; //Opening, Transfer, Closing, Adjusting, Compound
	description: string;
}

interface EntryData {
	entry_id: string;
	entry_type: string;
	entry_description: string;
}

interface LineItem {
	amount: number;
	entryId: string;
	accId: number;
}

export type {
	User,
	Source,
	Account,
	Reference,
	ReferenceData,
	ReferenceInput,
	Entry,
	EntryData,
	LineItem,
};
