import PropTypes from 'prop-types'
import ReportLoader from '../ReportLoader/ReportLoader'
import TopMenu from '../TopMenu'
import ViewToolbar from '../ViewToolbar'
import BottomInfo from '../BottomInfo'
import ScaleSlider from '../ScaleSlider/ScaleSlider'
import ReportPlayground from '../ReportPlayground'

const ReportView = ({ id, name, selectedSheet }) => {
  return (
    <>
      <TopMenu reportName={name} />
      <ViewToolbar />
      <BottomInfo>
        <ScaleSlider />
      </BottomInfo>
      <ReportPlayground reportId={id} selectedSheet={selectedSheet}/>
    </>
  )
}

ReportView.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  selectedSheet: PropTypes.number
}

export default ReportLoader(ReportView)
