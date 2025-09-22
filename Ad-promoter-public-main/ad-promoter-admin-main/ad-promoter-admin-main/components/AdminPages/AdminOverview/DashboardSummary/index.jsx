import { useWidth } from '@/hooks';
import Image from 'next/image';

const breakpoint = 1024;
const DashboardSummary = (props) => {
  const { responsive } = useWidth(breakpoint);

  return (
    <>
      {responsive ? (
        <>
          <div className="dashboard">
            <p className="dash">Dashboard Summary</p>
            {props.pending && <h4>Loading...</h4>}
            {props.error && <h4>Something we wrong | Please try again</h4>}

            <div className="card">
              {props.details &&
                props.details.map((item, index) => (
                  <div
                    key={index}
                    className="card-info"
                    style={{
                      backgroundColor: item.bg,
                      boxShadow: item.shadow,
                    }}
                  >
                    <div className="card-column">
                      <div className="item-icon">
                        <Image src={item.icon} alt="icon" />
                        <p>{item.name}</p>
                      </div>
                      <p className="amount">{item.num}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="dashboard">
            {props.details && (
              <>
                <p className="dash">Dashboard Summary</p>
                <div
                  className="card-info"
                  style={{
                    backgroundColor: props.details[0].bg,
                    boxShadow: props.details[0].shadow,
                    width: '100%',
                  }}
                >
                  <div className="card-column">
                    <div className="item-icon">
                      <Image src={props.details[0].icon} alt="icon" />
                      <p>{props.details[0].name}</p>
                    </div>
                    <p className="amount">{props.details[0].num}</p>
                  </div>
                </div>
              </>
            )}
            <div className="card">
              {props.details &&
                props.details.map((item, index) => {
                  if (index == 0) {
                    return '';
                  }

                  return (
                    <div
                      key={index}
                      className="card-info"
                      style={{
                        backgroundColor: item.bg,
                        boxShadow: item.shadow,
                      }}
                    >
                      <div className="card-column">
                        <div className="item-icon">
                          <Image src={item.icon} alt="icon" />
                          <p>{item.name}</p>
                        </div>
                        <p className="amount">{item.num}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardSummary;
