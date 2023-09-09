import TextEditor from '@/components/dashboard/global/text-editor';
import DashboardLayout from '@/components/dashboard/layout';
import { OutputData } from '@editorjs/editorjs';
import React from 'react';
// createOrUpdateAbout
interface Props {}

const DashboardAboutPage = () => {
const [textEditorContentAbout, setTextEditorContentAbout] = React.useState<OutputData>()

console.log('textEditorContentAbout: ', textEditorContentAbout);



  return (
    <DashboardLayout>
      <TextEditor
        handleSubmission={()=>{}}
        value={textEditorContentAbout}
        set={setTextEditorContentAbout}
      />
    </DashboardLayout>
  );
};

export default DashboardAboutPage;
