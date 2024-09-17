export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number
          name: string
          restaurant_id: number
          created_at: string | null
          deleted: boolean | null
          can_be_deleted: boolean | null
          color: string | null
          success_percentage: number | null
        }
        Insert: {
          id?: number
          name: string
          restaurant_id: number
          created_at?: string | null
          deleted?: boolean | null
          can_be_deleted?: boolean | null
          color?: string | null
          success_percentage?: number | null
        }
        Update: {
          id?: number
          name?: string
          restaurant_id?: number
          created_at?: string | null
          deleted?: boolean | null
          can_be_deleted?: boolean | null
          color?: string | null
          success_percentage?: number | null
        }
      }
      providers: {
        Row: {
          id: number
          name: string
          created_at: string | null
          restaurant_id: number
          deleted: boolean | null
          can_be_deleted: boolean | null
          last_category_id: number | null
        }
        Insert: {
          id?: number
          name: string
          created_at?: string | null
          restaurant_id: number
          deleted?: boolean | null
          can_be_deleted?: boolean | null
          last_category_id?: number | null
        }
        Update: {
          id?: number
          name?: string
          created_at?: string | null
          restaurant_id?: number
          deleted?: boolean | null
          can_be_deleted?: boolean | null
          last_category_id?: number | null
        }
      }
      restaurants: {
        Row: {
          id: number
          created_at: string | null
          address: string | null
          image: string | null
          iva: number | null
          name: string
          created_by: string
        }
        Insert: {
          id?: number
          created_at?: string | null
          address?: string | null
          image?: string | null
          iva?: number | null
          name: string
          created_by: string
        }
        Update: {
          id?: number
          created_at?: string | null
          address?: string | null
          image?: string | null
          iva?: number | null
          name?: string
          created_by?: string
        }
      }
      transactions: {
        Row: {
          id: number
          amount: number
          restaurant_id: number
          flow: Database['public']['Enums']['flow'] | null
          impacted_balance: Database['public']['Enums']['impact_balance'] | null
          type: Database['public']['Enums']['transaction_type']
          provider_id: number | null
          category_id: number | null
          notes: string | null
          date: string
          deleted: boolean
          invoice_id: number | null
          firestore_id: string | null
          reference_number: string | null
          reason: string | null
        }
        Insert: {
          id?: number
          amount: number
          restaurant_id: number
          flow?: Database['public']['Enums']['flow'] | null
          impacted_balance?:
            | Database['public']['Enums']['impact_balance']
            | null
          type: Database['public']['Enums']['transaction_type']
          provider_id?: number | null
          category_id?: number | null
          notes?: string | null
          date?: string
          deleted?: boolean
          invoice_id?: number | null
          firestore_id?: string | null
          reference_number?: string | null
          reason?: string | null
        }
        Update: {
          id?: number
          amount?: number
          restaurant_id?: number
          flow?: Database['public']['Enums']['flow'] | null
          impacted_balance?:
            | Database['public']['Enums']['impact_balance']
            | null
          type?: Database['public']['Enums']['transaction_type']
          provider_id?: number | null
          category_id?: number | null
          notes?: string | null
          date?: string
          deleted?: boolean
          invoice_id?: number | null
          firestore_id?: string | null
          reference_number?: string | null
          reason?: string | null
        }
      }
      users_restaurants: {
        Row: {
          created_at: string | null
          user_id: string
          restaurant_id: number
          role: Database['public']['Enums']['user_role'] | null
        }
        Insert: {
          created_at?: string | null
          user_id: string
          restaurant_id: number
          role?: Database['public']['Enums']['user_role'] | null
        }
        Update: {
          created_at?: string | null
          user_id?: string
          restaurant_id?: number
          role?: Database['public']['Enums']['user_role'] | null
        }
      }
    }
    Views: {
      transactions_with_invoice: {
        Row: {
          id: number | null
          amount: number | null
          restaurant_id: number | null
          flow: Database['public']['Enums']['flow'] | null
          impacted_balance: Database['public']['Enums']['impact_balance'] | null
          type: Database['public']['Enums']['transaction_type'] | null
          provider_id: number | null
          category_id: number | null
          notes: string | null
          date: string | null
          deleted: boolean | null
          invoice_id: number | null
          firestore_id: string | null
          reference_number: string | null
          reason: string | null
          invoice_number: string | null
        }
      }
      users: {
        Row: {
          id: string | null
          email: string | null
        }
        Insert: {
          id?: string | null
          email?: string | null
        }
        Update: {
          id?: string | null
          email?: string | null
        }
      }
    }
    Functions: {
      all_users_roles: {
        Args: { restaurant_id: number }
        Returns: {
          user_id: string
          email: string
          role: Database['public']['Enums']['user_role']
        }[]
      }
      create_restaurant: {
        Args: {
          user_id: string
          restaurant_name: string
          address: string
          image: string
          iva: number
        }
        Returns: number
      }
      grant_access: {
        Args: {
          restaurant_id: number
          user_id: string
          role: Database['public']['Enums']['user_role']
        }
        Returns: {
          userid: string
          userrole: Database['public']['Enums']['user_role']
          restaurantid: number
        }[]
      }
      other_user_roles: {
        Args: { restaurant_id: number; exclude_user_id: string }
        Returns: {
          user_id: string
          email: string
          role: Database['public']['Enums']['user_role']
        }[]
      }
      remove_access: {
        Args: { restaurant_id: number; user_id: string }
        Returns: {
          userid: string
          userrole: Database['public']['Enums']['user_role']
          restaurantid: number
        }[]
      }
      restaurant_balance: {
        Args: { restaurant_id: number }
        Returns: { bank: number; cash: number }[]
      }
    }
    Enums: {
      flow: 'CREDIT' | 'DEBIT'
      impact_balance: 'CASH' | 'BANK'
      transaction_type:
        | 'ALBARAN'
        | 'INVOICE'
        | 'POSITIVE_ADJUSTMENT'
        | 'NEGATIVE_ADJUSTMENT'
        | 'INCOME'
        | 'OUTCOME'
      user_role: 'READER' | 'ADMINISTRATOR'
    }
  }
}
