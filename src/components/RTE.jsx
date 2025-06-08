import React from 'react';
import { Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';

const RTE = ({ name, label, control, defaultValue = '' }) => {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-2 pl-1 text-white">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY || '9ppbxil0gruu46aslsx39pgearcdbpiuo2r13v55tl0ic6w4'}
            initialValue={defaultValue}
            value={value}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'image',
                'advlist',
                'autolink',
                'lists',
                'link',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'help',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default RTE;