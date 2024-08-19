/* eslint-disable @typescript-eslint/indent */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
    public: {
      Tables: {       
        Pictures: {
          Row: {
            id: number;
            imageUrl: string;
            imageDesc: string;
            tags: string[];
            useTimes: number;
            fromCountry: string;
            create_time: string;
            del_flag: number;
          };
          Insert: {
            id?: never; // id 是自动生成的，不应在插入时提供
            imageUrl: string;
            imageDesc: string;
            tags: string[];
            useTimes?: number;
            fromCountry: string;
            create_time?: string;
            del_flag?: number | null;
          };
          Update: {
            id?: never; // id 是不可更新的
            imageUrl?: string;
            imageDesc?: string;
            tags?: string[];
            useTimes?: number;
            fromCountry?: string;
            create_time?: string;
            del_flag?: number | null;
          };
          Relationships: [];
        },
        History: {
          Row: {
            id: number;
            userId: number;
            targetImageUrl: string;
            sourceImageUrl: string;
            requestId: string;
            imageDesc: string;
            createTime: string;
            prompt: string;
            tags: string;
            create_time: string;
            del_flag: number;
          };
          Insert: {
            id?: never; // id 是自动生成的，不应在插入时提供
            userId: number;
            targetImageUrl: string;
            sourceImageUrl: string;
            requestId: string;
            imageDesc: string;
            createTime: string;
            prompt: string;
            tags: string;
            create_time?: string;
            del_flag?: number | null;
          };
          Update: {
            id?: never; // id 是不可更新的
            userId?: number;
            targetImageUrl?: string;
            sourceImageUrl?: string;
            requestId?: string;
            imageDesc?: string;
            createTime?: string;
            prompt?: string;
            tags?: string;
            create_time?: string;
            del_flag?: number | null;
          };
          Relationships: [];
        }
      }
    }
  }



export type Picture = Database['public']['Tables']['Picture']['Row'];
export type UserHistory = Database['public']['Tables']['History']['Row'];


type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
    PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
            Row: infer R;
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
    }
    ? R
    : never
    : never;

export type TablesInsert<
    PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
        Insert: infer I;
    }
    ? I
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
    }
    ? I
    : never
    : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
        Update: infer U;
    }
    ? U
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
    }
    ? U
    : never
    : never;

export type Enums<
    PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;