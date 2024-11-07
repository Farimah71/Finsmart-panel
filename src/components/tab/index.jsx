import { Tab, Tabs, TabList } from "react-tabs";
import 'react-tabs/style/react-tabs.css';

export const TabWrapper = ({ tabs, children }) => {
  return (
    <Tabs>
      <TabList style={{ marginBottom: "24px", paddingBottom: "10px", borderColor: "#f2f2f2", display: "flex", columnGap: "5px" }}>
        {tabs.map((tab, index) => (
          <Tab key={tab + index} style={{ border: "none", padding: "3px 20px", color: "#99a1b7" }} selectedClassName="!text-custom-dark !bg-custom-gray-light rounded-md">{tab}</Tab>
        ))}
      </TabList>
      {children}
    </Tabs>
  );
};
