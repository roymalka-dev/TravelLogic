import { FormStepper } from "@/components/form/FormStepper";
import { formTabs } from "@/config/form.config";
import { store, persistor } from "@/store/store";
import { RequestType } from "@/types/form.types";
import { IRule } from "@/types/rule.types";
import { generateTestPlanXLSX } from "@/utils/excel.utils";
import { Box, Paper, Typography } from "@mui/material";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function Home() {
  const submitRequest = async (request: RequestType) => {
    // Extract the necessary data from the form submission
    const rules = request.rules as IRule[];
    const polygons = request.polygons as string[];
    const tags = request.tags as string[];

    // Ensure types are correct before calling the generate function
    if (Array.isArray(rules) && Array.isArray(polygons)) {
      // Generate the XLSX file
      generateTestPlanXLSX(rules, polygons, tags);
    } else {
      console.error("Invalid form data:", { rules, polygons, tags });
      alert("Invalid form data. Please try again.");
    }
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              mb: 10,
            }}
          >
            <Typography variant="h5" gutterBottom>
              TraveLogic Test Plan Generator
            </Typography>
          </Box>

          <FormStepper tabs={formTabs} submit={submitRequest} />
        </Paper>
      </PersistGate>
    </Provider>
  );
}
