import { getImageURL } from '@/utils/api-request';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import React from 'react';

interface Props {
  set: React.Dispatch<React.SetStateAction<OutputData | undefined>>;
  value: OutputData | undefined;
  oldContent: OutputData | undefined;
}

const TextEditor = ({ value, set, oldContent }: Props) => {
  const editorRef = React.useRef<EditorJS>();

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

    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          editorRef.current = editor;
        },
        placeholder: 'Am a web developer that...',
        inlineToolbar: true,
        // @ts-expect-error
        data: { blocks: oldContent?.blocks },
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
                  const imageURL = await getImageURL(file);

                  return {
                    success: 1,
                    file: {
                      url: imageURL,
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
  }, [oldContent?.blocks]);

  React.useEffect(() => {
    const showEditor = async () => await initializeEditor();
    if (isMounted) {
      showEditor();
      return () => {
        editorRef.current?.destroy();
        editorRef.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  React.useEffect(() => {
    const intervalId = setInterval(async () => {
      if (editorRef.current) {
        try {
          const content = await editorRef.current.save();
          if (JSON.stringify(content) !== JSON.stringify(value)) {
            set(content);
          }
        } catch (error) {
          console.error('Error saving editor content:', error);
        }
      }
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [value, set]);

  return (
    <div className='w-full px-4 mt-0 pt-0 text-white relative'>
      <div className='article w-full typography'>
        <article id='editor' />
      </div>
    </div>
  );
};

export default TextEditor;
