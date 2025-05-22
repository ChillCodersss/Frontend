import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { Stepper, Step, StepLabel, useMediaQuery, Grow } from '@mui/material';
// import SettingsIcon from '@mui/icons-material/Settings';
// import GroupAddIcon from '@mui/icons-material/GroupAdd';
// import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import step1 from "@/assets/select_counselor.jpg";
import step2 from "@/assets/submit_request.jpg";
import step3 from "@/assets/start_study.jpg";
import './RoadMap.css'

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: ' #CCCCCC',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: ' #CCCCCC',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: ' #eaeaf0',
        borderRadius: 1,
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.grey[800],
        }),
    },
}));

const ColorlibStepIconRoot = styled('div')<{
        ownerState: { completed?: boolean; active?: boolean };
    }>(({ theme }) => ({
    backgroundColor: ' #cccccc',
    zIndex: 1,
    color: ' #ffffff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[700],
    }),
    variants: [
        {
            props: ({ ownerState }) => ownerState.active,
            style: {
                backgroundImage:
                'radial-gradient(circle at bottom left, #1a49ba, #09f)',
                boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
            },
        },
        {
            props: ({ ownerState }) => ownerState.completed,
            style: {
                backgroundImage:
                'radial-gradient(circle at bottom left, #1a49ba, #09f)',
                boxShadow: '0px 2px 15px 0px rgba(0,0,0,.25)',
            },
        },
    ],
}));

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    // const icons: { [index: string]: React.ReactElement<unknown> } = {
    //     1: <SettingsIcon />,
    //     2: <GroupAddIcon />,
    //     3: <VideoLabelIcon />,
    // };

    const icons: { [index: string]: string } = {
        1: "3",
        2: "2",
        3: "1",
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

export default function RoadMap() {
    const small_screen = useMediaQuery("(max-width: 600px)");

    const [stepsVisible, setStepsVisible] = useState({
        step1Visible: false,
        step2Visible: false,
        step3Visible: false,
    });

    const grow_transition_timeout = 600;     // timeout in millisecond

    useEffect(() => {
        const steps = document.querySelectorAll(".rm-step-label-wrapper");

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];

            if (entry.isIntersecting) {
                if (entry.target.id === "step1") {
                    setStepsVisible((prev) => ({
                        ...prev,
                        step1Visible: true,
                    }));
                }
                if (entry.target.id === "step2") {
                    setStepsVisible((prev) => ({
                        ...prev,
                        step2Visible: true,
                    }));
                }
                if (entry.target.id === "step3") {
                    setStepsVisible((prev) => ({
                        ...prev,
                        step3Visible: true,
                    }));
                }

                observer.unobserve(entry.target);
            }
        }, {
            threshold: 0.5,
        });

        observer.observe(steps[0]);
        observer.observe(steps[1]);
        observer.observe(steps[2]);
    }, []);

    let steps = [
        {
            label: "1", src: step1, text: "انتخاب مشاور شخصی", id: "step1", visible: stepsVisible.step1Visible
        },
        {
            label: "2", src: step2, text: "ثبت درخواست و ثبت‌نام دوره", id: "step2", visible: stepsVisible.step2Visible
        },
        {
            label: "3", src: step3, text: "شروع مشاوره تخصصی و دریافت برنامه تحصیلی", id: "step3",
            visible: stepsVisible.step3Visible
        }
    ];

    if (!small_screen)
        steps = steps.reverse();

    return (
            !small_screen ? 
            <Stepper alternativeLabel activeStep={3} connector={<ColorlibConnector/>} sx={{width: "100%"}}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>
                            <div className='rm-step-label-wrapper'>
                                <p className='rm-label'>
                                    {step.text}
                                </p>
                                <img className='rm-img' src={step.src}/>
                            </div>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper> :
            <div>
                {steps.map((step, index) =>
                    <Grow key={index} timeout={grow_transition_timeout} in={step.visible} style={{transformOrigin: "center"}}>
                        <div className='rm-step-label-wrapper' key={index} id={step.id}>
                            <div className='rm-step-label-first-row'>
                                <div className='rm-label-number'>{step.label}</div>
                                <p className='rm-label'>
                                    {step.text}
                                </p>
                            </div>
                            <img className='rm-img' src={step.src}/>
                        </div>
                    </Grow>
                )}
            </div>
    );
}