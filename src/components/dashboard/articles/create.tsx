import React from 'react';
import ModalWrapper from '../modal-wrapper';
import MetaDataDrawer from '../global/metadata-drawer';
import TextEditor from '../global/text-editor';
import { OutputData } from '@editorjs/editorjs';
import { ArticleItem } from '@/interface';

interface Props {
    handleMetadataChange: (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void;
    itemMetadata: ArticleItem | any
    setItemMetadata: React.Dispatch<React.SetStateAction<ArticleItem | any>>
    setShowMetadataDrawer: React.Dispatch<React.SetStateAction<boolean>>
    showMetadataDrawer: boolean
    handleReset: ()=>void
    textEditorContent: OutputData | undefined
    setTextEditorContent: React.Dispatch<React.SetStateAction<OutputData | undefined>>
    handleSubmission: (type:string)=>void
    totalCharacters: number
    totalWords: number
}

const DashboardDisplay = (props: Props) => {
  return (
    <div className='flex items-center mt-4 gap-x-3'>
      <ModalWrapper buttonName='Create Article'>
        <MetaDataDrawer
          handleMetadataChange={props.handleMetadataChange}
          stateValue={props.itemMetadata}
          setStateValue={props.setItemMetadata}
          setShowMetaDataDrawer={props.setShowMetadataDrawer}
          showMetaDataDrawer={props.showMetadataDrawer}
          handleReset={props.handleReset}
        />

        <section className='w-full h-screen overflow-y-auto'>
          <TextEditor
            oldContent={undefined}
            value={props.textEditorContent}
            set={props.setTextEditorContent}
          />
        </section>

        {!props.showMetadataDrawer && (
          <section className='px-4 py-2 flex items-center justify-between'>
            <div>
              <button
                type='submit'
                onClick={() => props.handleSubmission('draft')}
                className='inline-flex m-5 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-transparent border border-rose-700 rounded-md sm:w-auto gap-x-2 hover:bg-rose-700 hover:text-white hover:border-rose-700 active:ring-2 active:ring-rose-700'
              >
                Save as Draft
              </button>
              <button
                type='submit'
                onClick={() => props.handleSubmission('publish')}
                className='inline-flex m-5 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
              >
                Publish Article
              </button>
            </div>

            <div className='inline-flex items-center gap-2'>
              <p>Characters: {props.totalCharacters}</p>
              <p>Words: {props.totalCharacters === 0 ? 0 : props.totalWords}</p>
            </div>
          </section>
        )}
      </ModalWrapper>
    </div>
  );
};

export default DashboardDisplay;
