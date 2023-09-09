import EditorJS from '@editorjs/editorjs';
import React from 'react';

import { useRouter } from 'next/router';

const TextEditor = () => {
  const ref = React.useRef<EditorJS>();
  const [editorContent, setEditorContent] = React.useState<string>('');
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    // @ts-ignore
    const Embed = (await import('@editorjs/embed')).default;
    // @ts-ignore
    const Table = (await import('@editorjs/table')).default;
    // @ts-ignore
    const List = (await import('@editorjs/list')).default;
    // @ts-ignore
    const Code = (await import('@editorjs/code')).default;
    // @ts-ignore
    const LinkTool = (await import('@editorjs/link')).default;
    // @ts-ignore
    const InlineCode = (await import('@editorjs/inline-code')).default;
    // @ts-ignore
    const ImageTool = (await import('@editorjs/image')).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor;
        },
        placeholder: 'Am a web developer that...',
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: '/api/url-data',
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  // upload to uploadthing
                  // const [res] = await uploadFiles([file], 'imageUploader');

                  return {
                    success: 1,
                    file: {
                      // url: res.fileUrl,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  React.useEffect(() => {
    // Function to auto-expand the textarea
    function autoExpandTextarea(event: React.ChangeEvent<HTMLTextAreaElement>) {
      const textarea = event.target;
      textarea.style.height = 'auto'; // Reset height to auto
      textarea.style.height = textarea.scrollHeight + 'px'; // Set height to match content
    }

    // Query for elements with the "cdx-input" class and attach the auto-expand function
    const textareas = document.querySelectorAll('.cdx-input textarea');
    textareas.forEach((textarea) =>
      textarea.addEventListener('input', autoExpandTextarea)
    );

    // Clean up event listeners when the component unmounts
    return () => {
      textareas.forEach((textarea) =>
        textarea.removeEventListener('input', autoExpandTextarea)
      );
    };
  }, []);

  React.useEffect(() => {
    const init = async () => await initializeEditor();
    if (isMounted) {
      init();
      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);


  // Function to get the editor content and update state
  const getEditorContent = async () => {
    const content = await ref.current?.save();
    setEditorContent(content);
  };



  console.log('editorContent: ', editorContent);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  async function onSubmit() {
    const blocks = await ref.current?.save();
    console.log('blocks', blocks);
    getEditorContent();
  }

  if (!isMounted) {
    return null;
  }

  return (
    <div className='w-full p-4 rounded-lg  text-white'>
      <form >
        <div className=' article prose prose-headings:text-rose-800 prose-p:text-white prose-gray'>
          <article id='editor' className='' />
          <p className='text-sm'>
            Use{' '}
            <kbd className='rounded-md border text-white bg-muted px-1 text-xs uppercase'>
              Tab
            </kbd>{' '}
            to open the command menu.
          </p>
        </div>
      </form>
      <button onClick={onSubmit} >Save</button>
      <div>
        <h2>Editor Content</h2>
        <pre>{JSON.stringify(editorContent, null, 2)}</pre>
      </div>
    </div>
  );
};

export default TextEditor;
