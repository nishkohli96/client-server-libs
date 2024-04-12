import { useDatoCMSQuery } from 'hooks';
import { AllLegalPagesQuery } from './queries';

export default function DatoCMSPage() {
  useDatoCMSQuery(AllLegalPagesQuery);
  return (
    <p>DatoCMS</p>
  );
}
