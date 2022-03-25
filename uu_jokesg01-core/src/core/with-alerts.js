//@@viewOn:imports
import { createVisualComponent, useState, useCallback, Utils } from "uu5g05";
import { Alert } from "uu5g05-elements";
//@@viewOff:imports

export function withAlerts(Component) {
  return createVisualComponent({
    //@@viewOn:statics
    uu5Tag: `withAlerts(${Component.uu5Tag})`,
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: { ...Component.propTypes },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: { ...Component.defaultProps },
    //@@viewOff:defaultProps

    render(props) {
      //@@viewOn:private
      const [alertList, setAlertList] = useState([]);

      const handleAddAlert = useCallback(
        (alertProps) => {
          const alert = { ...alertProps, id: Utils.String.generateId() };
          setAlertList([...alertList, alert]);
        },
        [alertList]
      );

      function handleCloseAlert(id) {
        const newAlertList = alertList.filter((alert) => alert.id !== id);
        setAlertList(newAlertList);
      }
      //@@viewOff:private

      //@@viewOn:render
      return (
        <>
          <Component {...props} onAddAlert={handleAddAlert} />
          {alertList.map((alert) => (
            <Alert
              key={alert.id}
              header={alert.header}
              message={alert.message}
              priority={alert.priority}
              icon={alert.icon}
              durationMs={alert.durationMs}
              onClose={() => handleCloseAlert(alert.id)}
            />
          ))}
        </>
      );
      //@@viewOff:render
    },
  });
}

export default withAlerts;
