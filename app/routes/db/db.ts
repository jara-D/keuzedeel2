import {prisma} from "~/routes/db/client";
import {matchSorter} from "match-sorter";
import sortBy from "sort-by";

export const db = prisma;

type NoteMutation = {
	id?: number;
	title?: string;
	content?: string;
	userId?: number;
	createdAt?: string;
	viewedAt?: string;
};

export const getAllNotes = async (query?: string | null) => {
	let notes = await db.notes.findMany({
		where: {
			userId: 1,
		},
	});
	if (query) {
		notes = matchSorter(notes, query, {
			keys: ["title", "note"], // searches the title and note fields
		});
	}

	return notes.sort(sortBy("viewedAt"));
};

export const getNote = async (id: number) => {
	return db.notes.findUnique({where: {id}});
};
export const updateNote = async (id: number, updates: NoteMutation) => {
	return db.notes.update({
		where: {id},
		data: updates,
	});
};
export const deleteNote = async (id: number) => {
	return db.notes.delete({where: {id}});
};

export const createEmptyNote = async () => {
	return db.notes.create({
		data: {
			title: "",
			userId: 1,
			content: "",
			createdAt: new Date().toISOString(),
			viewedAt: new Date().toISOString(),
		},
	});
};

export const lookUpUser = async (email: string) => {
	return db.users.findUnique({
		where: {email},
	});
};

