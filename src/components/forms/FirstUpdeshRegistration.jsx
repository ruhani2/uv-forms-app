import { Box, Typography } from "@mui/material";
import { useState, lazy, Suspense, useEffect, useCallback } from "react";
import SearchBar from "../shared/Search";
import { FormProvider, set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  isSpousePageRequired,
  isGuardianPageRequired,
} from "../../utils/registrationUtils";

// components
const PersonalInformationStep = lazy(() =>
  import(
    "../firstUpdeshRegistrationSteps/PersonalInformationStep/PersonalInformationStep"
  )
);
const MainBranchDetails = lazy(() =>
  import("../firstUpdeshRegistrationSteps/BranchDetailsStep/MainBranchDetails")
);
const AddressDetailsStep = lazy(() =>
  import(
    "../firstUpdeshRegistrationSteps/AddressDetailsStep/AddressDetailsStep"
  )
);
const SpouseDetailsStep = lazy(() =>
  import("../firstUpdeshRegistrationSteps/SpouseDetailsStep/SpouseDetailsStep")
);
const DayalbaghSatsangToursStep = lazy(() =>
  import(
    "../firstUpdeshRegistrationSteps/DayalbaghSatsangToursStep/DayalbaghSatsangToursStep"
  )
);
const SatsangAttendanceStep = lazy(() =>
  import(
    "../firstUpdeshRegistrationSteps/SatsangAttendanceStep/SatsangAttendanceStep"
  )
);
const FatherDetailsStep = lazy(() =>
  import("../firstUpdeshRegistrationSteps/FatherDetailsStep/FatherDetailsStep")
);

import CardWidget from "../shared/CardWidget";
// schemas
import { personalInformationSchema } from "../../schema/steps/personalInformationSchema";
import { branchDetailsSchema } from "../../schema/steps/branchDetailsSchema";
import { addressDetailsSchema } from "../../schema/steps/addressDetailsSchema";
import { fatherDetailsSchema } from "../../schema/steps/fatherDetailsSchema";
import { spouseDetailsSchema } from "../../schema/steps/spouseDetailsSchema";
import { dayalbaghSatsangToursSchema } from "../../schema/steps/dayalbaghSatsangToursSchema";
import { satsangAttendanceSchema } from "../../schema/steps/satsangAttendanceSchema";
// default values
import { personalInformationDefaults } from "../../formDefaults/firstUpdeshRegistration/steps/personalInformationDefaults";
import { addressAndProfessionalDefaults } from "../../formDefaults/firstUpdeshRegistration/steps/addressAndProfessionalDefaults";
import { parentsDetailsDefaults } from "../../formDefaults/firstUpdeshRegistration/steps/parentsDetailsDefaults";
import { facilityDefaults } from "../../formDefaults/firstUpdeshRegistration/steps/facilityDefaults";
import { satsangAttendanceDefaults } from "../../formDefaults/firstUpdeshRegistration/steps/satsangAttendanceDefaults";
import { dayalbaghVisitsDefaults } from "../../formDefaults/firstUpdeshRegistration/steps/dayalbaghVisitsDefaults";
import { spouseAndGuardianDefaults } from "../../formDefaults/firstUpdeshRegistration/steps/spouseAndGurdianDefaults";
import { firstUpdeshRegistrationDefaults } from "../../formDefaults/firstUpdeshRegistration/steps/firstUpdeshRegistrationDefaults";
import { currentBranchDetailsSchema } from "../../schema/steps/currentLocationSchema";

export default function FirstUpdeshRegistration() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Personal Information",
      schema: personalInformationSchema,
      content: <PersonalInformationStep />,
      defaultValues: personalInformationDefaults,
    },
    {
      title: "Address and Professional Details",
      schema: addressDetailsSchema,
      content: <AddressDetailsStep namePrefix="applicant" />,
    },
    {
      title: "Father's Details",
      schema: fatherDetailsSchema,
      content: <FatherDetailsStep />,
      defaultValues: parentsDetailsDefaults,
    },

    {
      title: "Spouse Details",
      schema: spouseDetailsSchema,
      content: <SpouseDetailsStep />,
      defaultValues: spouseAndGuardianDefaults,
    },
    {
      title: "Present Centre/Branch Details",
      schema: currentBranchDetailsSchema,
      content: <MainBranchDetails namePrefix="applicant" />,
    },
    {
      title: "Satsang Attendances",
      schema: satsangAttendanceSchema,
      content: <SatsangAttendanceStep />,
      defaultValues: satsangAttendanceDefaults,
    },
    {
      title: "Dayalbagh Visits and Satsang Tours",
      schema: dayalbaghSatsangToursSchema,
      content: <DayalbaghSatsangToursStep />,
      defaultValues: dayalbaghVisitsDefaults,
    },
  ];

  const methods = useForm({
    resolver: (data, context, options) => {
      const schema =
        step === 3
          ? spouseDetailsSchema(
              isSpousePageRequired(data),
              data.applicant?.gender,
              isGuardianPageRequired(data)
            )
          : steps[step].schema;
      return zodResolver(schema)(data, context, options);
    },
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldUnregister: false,
    defaultValues: firstUpdeshRegistrationDefaults,
  });

  const {
    formState: { isValid },
  } = methods;

  const handleSearch = (query) => {};

  const onSubmit = (data) => {
    console.log("Submitted:", data);
  };

  const isFirstStep = step === 0;
  const isLastStep = step === steps.length - 1;
  console.log("step", isLastStep);

  const handleNext = useCallback(async () => {
    const isValid = await methods.trigger();
    if (!isValid) {
      // Print all validation errors
      console.log("Validation", methods.formState);
      console.log("Validation errors:", methods.formState.errors);
    }
    if (isValid) {
      const values = methods.getValues();

      const response = await fetch("/api/first_updesh_registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.id) {
        if (step === 2) {
          if (isSpousePageRequired(values) || isGuardianPageRequired(values)) {
            setStep(3);
          } else {
            setStep(4);
          }
        } else {
          setStep((s) => Math.min(s + 1, steps.length - 1));
        }
      }
    }
  }, [step, methods]);

  const handlePrevious = useCallback(() => {
    const values = methods.getValues();
    if (step === 4) {
      if (isSpousePageRequired(values) || isGuardianPageRequired(values)) {
        setStep(3);
      } else {
        setStep(2);
      }
    } else {
      setStep((s) => Math.max(s - 1, 0));
    }
  }, [methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Box>
          {isFirstStep && (
            <SearchBar onSearch={handleSearch} disabled={!isFirstStep} />
          )}
          <Typography variant="h6" sx={{ mb: 2 }}>
            S&D Registration
          </Typography>
          <CardWidget
            title={steps[step].title}
            onNext={!isLastStep ? handleNext : undefined}
            onPrevious={!isFirstStep ? handlePrevious : undefined}
            showPrevious={!isFirstStep}
            showNext={!isLastStep}
            nextDisabled={false}
            isLastStep={isLastStep}
          >
            <Suspense fallback={<div>Loading...</div>}>
              {steps[step].content}
            </Suspense>
          </CardWidget>
        </Box>
      </form>
    </FormProvider>
  );
}
