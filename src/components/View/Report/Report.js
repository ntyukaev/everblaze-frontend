import PropTypes from 'prop-types'
import ReportLoader from './ReportLoader'
import { TopMenu, ViewToolbar, BottomInfo } from '../../Layout'
import ScaleSlider from '../../ScaleSlider'
import ReportPlayground from './ReportPlayground'

const Report = ({ id, name, selectedSheet }) => {
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

Report.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  selectedSheet: PropTypes.number
}

export default ReportLoader(Report)
