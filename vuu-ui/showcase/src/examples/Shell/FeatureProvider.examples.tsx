import { FeatureList, useFeatures } from "@finos/vuu-shell";
import { StaticFeatureDescriptor } from "@finos/vuu-utils";
import { FeatureAndLayoutProvider } from "@finos/vuu-shell";

const staticFeatures: StaticFeatureDescriptor[] = [
  { label: "label1", type: "Placeholder" },
  { label: "label2", type: "Component" },
  { label: "label3", type: "Placeholder" },
  { label: "label4", type: "View" },
  { label: "label5", type: "Placeholder" },
];

const StaticFeaturesTemplate = () => {
  const { staticFeatures = [] } = useFeatures();
  return (
    <>
      <FeatureList features={staticFeatures} />
    </>
  );
};

export const DefaultStaticFeatures = () => {
  return (
    <FeatureAndLayoutProvider
      dynamicFeatures={[]}
      staticFeatures={staticFeatures}
    >
      <StaticFeaturesTemplate />
    </FeatureAndLayoutProvider>
  );
};
