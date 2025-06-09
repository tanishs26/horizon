import { createClient } from '@supabase/supabase-js';

export class SupabaseStorage {
  supabaseClient;
  constructor() {
    this.supabaseClient = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_KEY
    );
  }

  async createPost({ title, slug, content, featuredImage, userid }) {
    try {
      const { data: existing } = await this.supabaseClient
        .from('posts')
        .select('slug')
        .eq('slug', slug)
        .single();
      if (existing) throw new Error('Slug already exists');

      const { error } = await this.supabaseClient
        .from('posts')
        .insert([{ title, slug, content, featuredImage, userid }]);
      if (error) throw error;
    } catch (error) {
      console.error('Creating post:', error.message);
      throw error; // Propagate error to caller
    }
  }

  async updatePost(oldSlug, { title, slug, content, featuredImage }) {
    try {
      if (oldSlug !== slug) {
        const { data: existing } = await this.supabaseClient
          .from('posts')
          .select('slug')
          .eq('slug', slug)
          .single();
        if (existing) throw new Error('Slug already exists');
      }

      const { error } = await this.supabaseClient
        .from('posts')
        .update({ title, slug, content, featuredImage })
        .eq('slug', oldSlug);
      if (error) throw error;
    } catch (error) {
      console.error('Updating post:', error.message);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      const { error } = await this.supabaseClient
        .from('posts')
        .delete()
        .eq('slug', slug);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Deleting post:', error.message);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      const { data, error } = await this.supabaseClient
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Fetching post:', error.message);
      throw error;
    }
  }

  async getAllPosts() {
    try {
      const { data, error } = await this.supabaseClient
        .from('posts')
        .select('*');
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Fetching all posts:', error.message);
      return [];
    }
  }

  async uploadImageFile(file) {
    const uniqueId = Date.now();
    const filePath = `${uniqueId}_${file.name}`;
    try {
      const { error } = await this.supabaseClient.storage
        .from('task-images')
        .upload(filePath, file);
      if (error) throw error;

      const { data } = this.supabaseClient.storage
        .from('task-images')
        .getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error('Upload file error:', error.message);
      throw error;
    }
  }

  async deleteImageFile(filePath) {
    try {
      const { error } = await this.supabaseClient.storage
        .from('task-images')
        .remove([filePath]);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Delete file error:', error.message);
      throw error;
    }
  }
}

const supabaseStorage = new SupabaseStorage();
export default supabaseStorage;