export interface BoundingBox {
	topRow: number;
	bottomRow: number;
	rightCol: number;
	leftCol: number;
}

export interface ImageStateData {
	input: string;
	imageUrl: string;
	boxes: BoundingBox[];
}
export interface User {
	id: number | string;
	name: string;
	email: string;
	entries: number;
	joined: Date | string;
}

export interface LoadUser {
	id: number;
	name: string;
	email: string;
	entries: number;
	joined: Date;
}

export interface BoundingBoxClarifai {
	top_row: number;
	bottom_row: number;
	right_col: number;
	left_col: number;
}

export interface DataResponse {
	outputs: any[];
}

export interface Region_Info {
	bounding_box: BoundingBoxClarifai;
}

export interface Region {
	id: string;
	region_info: Region_Info;
	data: unknown;
	value: number;
}
