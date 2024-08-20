// import { db } from "@/database/database";
import { PictureStatus } from "@/prisma/enums";
// import { Picture } from "@/prisma/types";
import {Picture} from "@/database/supbaseTypes";
// import { Insertable, Selectable } from "kysely";
import { createClient } from '@/database/supabaseClient';

const supabase = createClient();
export async function findPictureById(id: string) {
  const { data, error } = await supabase
    .from("pictures")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Error finding picture by id: ${error.message}`);
  }

  return data;
}

export async function findPictures(criteria: Partial<Picture>) {
  let query = supabase.from("pictures").select("*");  

  if (criteria.id) {
    query = query.eq("id", criteria.id);
  }
  // if (criteria.userId) {
  //   query = query.eq("userId", criteria.userId);
  // }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Error finding pictures: ${error.message}`);
  }

  return data;
}

export async function getTotalPicturesCount(): Promise<number> {
  const { data, error } = await supabase
    .from("Picture")
    .select("id", { count: "exact" });

  if (error) {
    throw new Error(`Error getting total pictures count: ${error.message}`);
  }

  return data.length;
}

export async function listPicturesPaginated(page: number, pageSize: number) {
  const offset = (page - 1) * pageSize;

  const { data, error } = await supabase
    .from("Picture")
    .select("*")
    .order("create_time", { ascending: false })
    .range(offset, offset + pageSize - 1);

  if (error) {
    throw new Error(`Error listing pictures: ${error.message}`);
  }

  return data;
}

export async function createPicture(picture: Partial<Picture>) {
  const { data, error } = await supabase
    .from("Picture")
    .insert(picture)
    .select()
    .single();

  if (error) {
    throw new Error(`Error creating picture: ${error.message}`);
  }

  return data;
}

export async function deletePicture(id: string) {
  const { data, error } = await supabase
    .from("Picture")
    .update({ status: PictureStatus.DELETED })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error deleting picture: ${error.message}`);
  }

  return data;
}

