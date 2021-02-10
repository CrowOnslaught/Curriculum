// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideInOutAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('slideInOutAnimation', [

        // end state styles for route container (host)
        state('*', style({
            // the view covers the whole screen with a semi tranparent background
            position: 'fixed',
            overflow:"auto",
            top: 0,
            left: "70px",
            right: 0,
            bottom: 0,

        })),

        // route 'enter' transition
        transition(':enter', [

            // styles at start of transition
            style({
                right: '-400%',

            }),

            // animation and styles at end of transition
            animate('.4s ease-in-out', style({
                // transition the right position to 0 which slides the content into view
                right: 0,

            }))
        ]),

        // route 'leave' transition
        transition(':leave', [
            // animation and styles at end of transition
            animate('.4s ease-in-out', style({
                right: '-400%',
            }))
        ])
    ]);
