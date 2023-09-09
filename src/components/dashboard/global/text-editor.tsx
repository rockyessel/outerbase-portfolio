import EditorJS, { OutputData } from '@editorjs/editorjs';
import React from 'react';

interface Props {
  set: React.Dispatch<React.SetStateAction<OutputData | undefined>>;
  value: OutputData | undefined;
  handleSubmission: ()=> void
}

const TextEditor = ({ value, set }: Props) => {
  const ref = React.useRef<EditorJS>();

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
    const Show = async () => await initializeEditor();
    if (isMounted) {
      Show();
      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  const handleSubmission = async () => {
    const content = await ref.current?.save();
    set(content);
  };

  return (
    <div className='w-full p-4 rounded-lg  text-white'>
      <form>
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
      <button onClick={handleSubmission}>Save</button>
      <div>
        <h2>Editor Content</h2>
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </div>
    </div>
  );
};

export default TextEditor;
