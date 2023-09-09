import TextEditor from '@/components/dashboard/global/text-editor';
import DashboardLayout from '@/components/dashboard/layout';
import React from 'react';

interface Props {}

const DashboardContactPage = () => {
  return (
    <DashboardLayout>
      <TextEditor />
    </DashboardLayout>
  );
};

export default DashboardContactPage;
